import { Card, List } from "@/generated/prisma";

export type ListWithCards = List & { cards: Card[] };

export type CardWithList = Card & { list: List };
