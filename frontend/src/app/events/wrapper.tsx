import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface Event {
  id: string;
  name: string;
  date: string;
  venue: string;
  type: string;
  desc: string;
}

function extractTime(date: string) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
}

function extractDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function volunteer(id:string) {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/volunteer/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id:id
    }),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject();
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function register(id:string) {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id:id
    }),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject();
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export default function DrawerDialogDemo({ event,UserRole }: { event: Event ,UserRole:string}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {/* <Button variant="outline"> */}
          <Card>
            <CardContent className="flex aspect-square items-center justify-center p-6">
              <span className="text-4xl font-semibold">
                <div className="text-center">
                  {/* Move event information to the lower half of the card */}
                  <div className="mb-2">
                    <h2 className="text-4xl font-semibold">{event.name}</h2>
                  </div>
                  <div className="mb-2">
                    Date: {extractDate(event.date)}
                    <div className=" mb-2"></div>
                    Time: {extractTime(event.date)}
                  </div>
                  <div className=" mb-2">Venue: {event.venue}</div>
                  <div className="mb-2">{event.type}</div>
                </div>
              </span>
            </CardContent>
          </Card>
          {/* </Button> */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{event.name}</DialogTitle>
            <DialogDescription>{event.desc}</DialogDescription>
          </DialogHeader>
          <form className="grid items-start gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Date: {extractDate(event.date)}</Label>
              {/* <Input
                type="email"
                id="email"
                defaultValue="shadcn@example.com"
              /> */}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Venue: {event.venue}</Label>
              {/* <Input id="username" defaultValue="@shadcn" /> */}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Type: {event.type}</Label>
              {/* <Input id="username" defaultValue="@shadcn" /> */}
            </div>
            
            {(UserRole==="participant" || UserRole==="student") && (<Button type="submit" onClick={() => register(event.id)}>Register</Button>)}
            {UserRole==="student" && (<Button type="submit" onClick={() => register(event.id)}>Volunteer</Button>)}
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button>
         */}
        <Card>
          <CardContent className="flex aspect-square items-center justify-center p-6">
            <span className="text-4xl font-semibold">
              <div className="text-center">
                {/* Move event information to the lower half of the card */}
                <div className="mb-2">
                  <h2 className="text-4xl font-semibold">{event.name}</h2>
                </div>
                <div className="text-gray-600 mb-2">
                  Date: {extractDate(event.date)}
                </div>
                <div className="text-gray-600 mb-2">Venue: {event.venue}</div>
                <div className="text-gray-600 mb-2">{event.type}</div>
              </div>
            </span>
          </CardContent>
        </Card>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{event.name}</DrawerTitle>
          <DrawerDescription>{event.desc}</DrawerDescription>
        </DrawerHeader>
        {/* <ProfileForm className="px-4" /> */}
        <form className="px-4 grid items-start gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Date: {extractDate(event.date)}</Label>
            {/* <Input
                type="email"
                id="email"
                defaultValue="shadcn@example.com"
              /> */}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Venue: {event.venue}</Label>
            {/* <Input id="username" defaultValue="@shadcn" /> */}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Type: {event.type}</Label>
            {/* <Input id="username" defaultValue="@shadcn" /> */}
          </div>

          <Button type="submit">Ok</Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" defaultValue="shadcn@example.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="@shadcn" />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
}
