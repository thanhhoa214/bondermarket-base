"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function RecentMarketSection() {
  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      plugins={[Autoplay({ delay: 4000 })]}
    >
      <CarouselContent>
        {Array.from({ length: 10 }).map((_, i) => (
          <CarouselItem className="sm:basis-1/3" key={i}>
            <Card className="bg-purple-500/10">
              <CardHeader>
                <CardTitle>Active Energy</CardTitle>
                <CardDescription>
                  You are burning an average of 754
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-row items-baseline gap-4 pb-6">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex
                magni eligendi earum deleniti
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-3 bg-foreground/5 backdrop-blur-sm" />
      <CarouselNext className="-right-3 bg-foreground/5 backdrop-blur-sm" />
    </Carousel>
  );
}
