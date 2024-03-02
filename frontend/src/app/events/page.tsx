"use client";

import { EventItem } from "@/components/event-item";
import EventPic from "@/images/animal-after.webp";
const DrawerDialogDemo = dynamic(() => import("./wrapper"), {
  ssr: false,
});


export interface Event {
  id: string;
  name: string;
  date: Date;
  venue: string;
  type: string;
  desc: string;
}

const EventList: Event[] = [
  {
    id: "1",
    name: "Event 1",
    date: new Date("2022-01-01"),
    venue: "Venue 1",
    type: "Type 1",
    desc: "Description 1",
  },
  {
    id: "2",
    name: "Event 2",
    date: new Date("2022-02-2"),
    venue: "Venue 2",
    type: "Type 2",
    desc: "Description 2",
  },
  {
    id: "3",
    name: "Event 3",
    date: new Date("2022-3-3"),
    venue: "Venue 3",
    type: "Type 3",
    desc: "Description 3",
  },
  {
    id: "4",
    name: "Event 4",
    date: new Date("2022-4-4"),
    venue: "Venue 4",
    type: "Type 4",
    desc: "Description 4",
  },
  {
    id: "5",
    name: "Event 5",
    date: new Date("2022-5-5"),
    venue: "Venue 5",
    type: "Type 5",
    desc: "Description 5",
  },
  {
    id: "6",
    name: "Event 6",
    date: new Date("2022-6-6"),
    venue: "Venue 6",
    type: "Type 6",
    desc: "Description 6",
  },
  {
    id: "7",
    name: "Event 7",
    date: new Date("2022-7-7"),
    venue: "Venue 7",
    type: "Type 7",
    desc: "Description 7",
  },
  {
    id: "8",
    name: "Event 8",
    date: new Date("2022-8-8"),
    venue: "Venue 8",
    type: "Type 8",
    desc: "Description 8",
  },
  {
    id: "9",
    name: "Event 9",
    date: new Date("2022-9-9"),
    venue: "Venue 9",
    type: "Type 9",
    desc: "Description 9",
  }
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
import dynamic from "next/dynamic";

export default function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <main className="flex items-center justify-center h-screen">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-xl"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {EventList.map((event, index) => (
            <CarouselItem key={index} className="ring ring-400 ring-opacity-50 focus:ring-2 focus:ring-600 transition-transform transform hover:scale-105">
              {/* <div className="p-1"> */}
                {/* <Card className="w-full h-full"> */}
                  <DrawerDialogDemo event={event}/>
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
