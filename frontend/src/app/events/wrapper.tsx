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
  date: Date;
  venue: string;
  type: string;
  desc: string;
}

export function DrawerDialogDemo({ event }: { event: Event }) {
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
                  <div className="text-gray-600 mb-2">
                    Date: {event.date.toLocaleDateString()}
                  </div>
                  <div className="text-gray-600 mb-2">Venue: {event.venue}</div>
                  <div className="text-gray-600 mb-2">{event.type}</div>
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
              <Label htmlFor="email">
                Date: {event.date.toLocaleDateString()}
              </Label>
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
                  Date: {event.date.toLocaleDateString()}
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
            <Label htmlFor="email">
              Date: {event.date.toLocaleDateString()}
            </Label>
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
