import z from "zod";
import express, { Request, Response } from "express";
import { orderBook, bookWithQuantity } from "./orderbook";
import { OrderSchema } from "./types";
import { randomUUID } from "crypto";

const app = express();
app.use(express.json());

const BASE_ASSET = "BTC";
const QUOTE_ASSET = "USD";
let GLOBAL_TRADE_ID = 0;

app.post("/api/v1/order", async function (req: Request, res: Response) {
  const parsedBody = OrderSchema.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({
      message: "Invalid order format",
      errors: parsedBody.error.errors,
    });
    return;
  }

  const { baseAsset, quoteAsset, price, quantity, side, kind } =
    parsedBody.data;

  if (baseAsset !== BASE_ASSET || quoteAsset !== QUOTE_ASSET) {
    res.status(400).json({ message: "Invalid asset pair" });
    return;
  }

  const orderId = randomUUID();

  const { executedQty, fills } = fillOrder(
    side,
    price,
    quantity,
    orderId,
    kind
  );

  res.status(201).json({
    orderId,
    executedQty,
    fills,
  });
});

interface Fill {
  price: number;
  quantity: number;
  tradeId: number;
}

const fillOrder = (
  side: "buy" | "sell",
  price: number,
  quantity: number,
  orderId: string,
  kind?: "ioc"
) => {
  const maxFillQuantity = getFillQuantity(side, price, quantity);
  let executedQty = 0;
  const fills: Fill[] = [];

  if (kind === "ioc" && maxFillQuantity < quantity) {
    console.log("ioc returned");
    return {
      status: "rejected",
      executedQty: maxFillQuantity,
      fills,
    };
  }
  if (side === "buy") {
    orderBook.asks.forEach((ask) => {
      if (ask.price <= price && quantity > 0) {
        const filledQuantity = Math.min(quantity, ask.quantity);
        ask.quantity -= filledQuantity;
        bookWithQuantity.asks[ask.price] =
          (bookWithQuantity.asks[ask.price] || 0) - filledQuantity;
        fills.push({
          price: ask.price,
          quantity: filledQuantity,
          tradeId: GLOBAL_TRADE_ID++,
        });
        executedQty += filledQuantity;
        quantity -= filledQuantity;
        // Debugging logs
        console.log("Ask quantity after fill: ", ask.quantity);
        console.log("Book with Quantity Asks: ", bookWithQuantity.asks);
        if (ask.quantity === 0) {
          orderBook.asks = orderBook.asks.filter((a) => a.price !== ask.price);
        }
        if (bookWithQuantity.asks[ask.price] === 0) {
          delete bookWithQuantity.asks[ask.price];
        }
      }
    });

    if (quantity > 0) {
      orderBook.bids.push({
        price,
        quantity,
        orderId,
        side: "buy",
      });
      bookWithQuantity.bids[price] =
        (bookWithQuantity.bids[price] || 0) + quantity - executedQty;
    }
  } else if (side === "sell") {
    orderBook.bids.forEach((bid) => {
      if (bid.price >= price && quantity > 0) {
        const filledQuantity = Math.min(quantity, bid.quantity);
        bid.quantity -= filledQuantity;
        bookWithQuantity.bids[bid.price] =
          bookWithQuantity.bids[bid.price] || 0 - filledQuantity;
        fills.push({
          price: bid.price,
          quantity: filledQuantity,
          tradeId: GLOBAL_TRADE_ID++,
        });
        executedQty += filledQuantity;
        quantity -= filledQuantity;
        // Debugging logs
        console.log("Bid quantity after fill: ", bid.quantity);
        console.log("Book with Quantity Bids: ", bookWithQuantity.bids);
        if (bid.quantity === 0) {
          orderBook.bids = orderBook.bids.filter((b) => b.price !== bid.price);
        }
        if (bookWithQuantity.bids[bid.price] === 0) {
          delete bookWithQuantity.bids[bid.price];
        }
      }
    });
    if (quantity > 0) {
      orderBook.asks.push({
        price,
        quantity,
        orderId,
        side: "sell",
      });
      bookWithQuantity.asks[price] =
        (bookWithQuantity.asks[price] || 0) + quantity - executedQty;
    }
  }

  console.log("Orderbook : ", orderBook);
  console.log("Book with Quantity : ", bookWithQuantity);

  return {
    status: "accepted",
    executedQty,
    fills,
  };
};

const getFillQuantity = (
  side: "buy" | "sell",
  price: number,
  quantity: number
) => {
  let fill = 0;
  if (side === "buy") {
    orderBook.asks.forEach((ask) => {
      if (ask.price <= price && fill < quantity) {
        fill += Math.min(quantity, ask.quantity);
      }
    });
  } else {
    orderBook.bids.forEach((bid) => {
      if (bid.price >= price && fill < quantity) {
        fill += Math.min(quantity, bid.quantity);
      }
    });
  }
  return fill;
};

app.listen(3000, () => {
  console.log("Orderbook Server is running on port 3000");
});
