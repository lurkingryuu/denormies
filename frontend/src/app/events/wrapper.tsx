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

export interface Volunteer {
  name: string;
  roll: string;
  dept: string;
}

export interface Participant {
  name: string;
  roll: string;
  dept: string; //add relevant fields
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

function volunteer(id: string) {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/volunteer/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
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

function register(id: string) {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
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

export default function DrawerDialogDemo({
  event,
  UserRole,
}: {
  event: Event;
  UserRole: string;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [VolunteerList, setVolunteerList] = React.useState<Volunteer[]>([]);
  const [ParticipantList, setParticipantList] = React.useState<Participant[]>(
    []
  );

  React.useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/participants/all/${event.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setParticipantList(data.events);
      });
  }, []);
  React.useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/volunteers/all/${event.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setParticipantList(data.events);
      });
  }, []);
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
            {(UserRole === "participant" || UserRole === "student") && (
              <Button type="submit" onClick={() => register(event.id)}>
                Register
              </Button>
            )}
            {UserRole === "student" && (
              <Button type="submit" onClick={() => volunteer(event.id)}>
                Volunteer
              </Button>
            )}

            {UserRole === "organizer" && (
              <div className="grid gap-2">
                {!VolunteerList && (
                  //print no empty list
                  <Label htmlFor="username">No volunteers as of now</Label>
                )}
                {/* {console.log(VolunteerList);console.log("hey")} */}
                {VolunteerList && (
                  <>
                    <Label htmlFor="username">Volunteers</Label>
                    <ul>
                      {VolunteerList.map((volunteer) => (
                        <li>
                          {volunteer.name} {volunteer.roll} {volunteer.dept}{" "}
                          {/*add relevant fields*/}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {!ParticipantList && (
                  //print no empty list
                  <Label htmlFor="username">No participants as of now</Label>
                )}
                {ParticipantList && (
                  <>
                    {" "}
                    <Label htmlFor="username">Participants</Label>
                    <ul>
                      {ParticipantList.map((participant) => (
                        <li>
                          {participant.name} {participant.roll}{" "}
                          {participant.dept}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
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

          {(UserRole === "participant" || UserRole === "student") && (
            <Button type="submit" onClick={() => register(event.id)}>
              Register
            </Button>
          )}
          {UserRole === "student" && (
            <Button type="submit" onClick={() => register(event.id)}>
              Volunteer
            </Button>
          )}
          {UserRole === "organizer" && (
            <div className="grid gap-2">
              {!VolunteerList && (
                //print no empty list
                <Label htmlFor="username">No volunteers as of now</Label>
              )}
              {/* {console.log(VolunteerList);console.log("hey")} */}
              {VolunteerList && (
                <>
                  <Label htmlFor="username">Volunteers</Label>
                  <ul>
                    {VolunteerList.map((volunteer) => (
                      <li>
                        {volunteer.name} {volunteer.roll} {volunteer.dept}{" "}
                        {/*add relevant fields*/}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {!ParticipantList && (
                //print no empty list
                <Label htmlFor="username">No participants as of now</Label>
              )}
              {ParticipantList && (
                <>
                  {" "}
                  <Label htmlFor="username">Participants</Label>
                  <ul>
                    {ParticipantList.map((participant) => (
                      <li>
                        {participant.name} {participant.roll} {participant.dept}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
        </form>
      </DrawerContent>
    </Drawer>
  );
}
