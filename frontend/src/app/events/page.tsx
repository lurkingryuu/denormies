"use client";

import { EventItem } from "@/components/event-item";
import EventPic from "@/images/animal-after.webp";
import { DrawerDialogDemo } from "./wrapper";


export interface Event {
  name: string;
  desc: string;
  thumbnail: string;
}

const EventList: Event[] = [
  {
    name: "The Weeknd",
    desc: "After Hours",
    thumbnail: "/animal-after.webp",
  },  
  {
    name: "The Weeknd",
    desc: "After Hours",
    thumbnail: "/animal-after.webp",
  },
  {
    name: "The Weeknd",
    desc: "After Hours",
    thumbnail: "/animal-after.webp",
  },
  {
    name: "The Weeknd",
    desc: "After Hours",
    thumbnail: "/animal-after.webp",
  },
  {
    name: "The Weeknd",
    desc: "After Hours",
    thumbnail: "/animal-after.webp",
  },
  {
    name: "The Weeknd",
    desc: "After Hours",
    thumbnail: "/animal-after.webp",
  },
];

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <main className="flex items-center justify-center h-screen">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-xs"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="ring ring-400 ring-opacity-50 focus:ring-2 focus:ring-600 transition-transform transform hover:scale-105">
              {/* <div className="p-1"> */}
                {/* <Card className="w-full h-full"> */}
                  <DrawerDialogDemo/>
                {/* </Card> */}
              {/* </div> */}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  );
}
