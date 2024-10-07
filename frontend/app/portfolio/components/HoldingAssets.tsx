import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardProps,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const assets = [
  {
    name: "Will Biden win?",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto, veniam!",
    asset: "Yes",
    amount: 100,
    price: 0.6,
  },
  {
    name: "Will Trump win?",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto, veniam!",
    asset: "No",
    amount: 130,
    price: 0.4,
  },
];

export default function HoldingAssets(props: CardProps) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Positions</CardTitle>
        <CardDescription>All positions you are holding now</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <ul>
          {assets.map((asset, index) => (
            <div key={asset.name}>
              {index > 0 && <hr />}
              <li className="flex items-center py-2 px-2 -mx-2 gap-4 rounded-md hover:bg-foreground/5">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="max-w-60 line-clamp-2">
                  <Link href={"/market"} className="font-semibold ftext-sm">
                    {asset.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    04:24s to expire
                  </p>
                </div>
                <p className="ml-auto flex items-center gap-1 text-sm">
                  {asset.amount}
                  <Badge variant={"outline"}>{asset.asset}</Badge>
                </p>
                <div className="flex items-center gap-1">
                  <Button size={"sm"} variant={"secondary"} className="w-24">
                    {asset.asset.includes("LP") ? "Withdraw" : "Sell"}
                  </Button>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
