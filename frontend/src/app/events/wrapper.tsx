import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
            <CardHeader>
              <CardTitle className="font-bold text-xl">{event.name}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="necessary" className="flex flex-col space-y-1">
                  <span>{extractDate(event.date)}</span>
                </Label>
                <span>{extractTime(event.date)}</span>
                {/* <Switch id="necessary" defaultChecked /> */}
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="functional" className="flex flex-row space-x-2">
                  <div>Venue:</div>{" "}
                  <div className="font-bold"> {event.venue}</div>
                </Label>
                {/* <Switch id="functional" /> */}
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="functional" className="flex flex-row space-x-2">
                  <div>Type:</div>{" "}
                  <div className="font-bold"> {event.type}</div>
                </Label>
                {/* <Switch id="functional" /> */}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </CardFooter>
          </Card>
          {/* </Button> */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-bold text-xl">{event.name}</DialogTitle>
            <DialogDescription>{event.desc}</DialogDescription>
          </DialogHeader>
          <form className="grid items-start gap-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="necessary" className="flex flex-col space-y-1">
                <span>{extractDate(event.date)}</span>
              </Label>
              <span>{extractTime(event.date)}</span>
              {/* <Switch id="necessary" defaultChecked /> */}
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="functional" className="flex flex-row space-x-2">
                <div>Venue:</div>{" "}
                <div className="font-bold"> {event.venue}</div>
              </Label>
              {/* <Switch id="functional" /> */}
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="functional" className="flex flex-row space-x-2">
                <div>Type:</div> <div className="font-bold"> {event.type}</div>
              </Label>
              {/* <Switch id="functional" /> */}
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
          <CardHeader>
            <CardTitle className="font-bold text-xl">{event.name}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="necessary" className="flex flex-col space-y-1">
                <span>{extractDate(event.date)}</span>
              </Label>
              <span>{extractTime(event.date)}</span>
              {/* <Switch id="necessary" defaultChecked /> */}
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="functional" className="flex flex-row space-x-2">
                <div>Venue:</div>{" "}
                <div className="font-bold"> {event.venue}</div>
              </Label>
              {/* <Switch id="functional" /> */}
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="functional" className="flex flex-row space-x-2">
                <div>Type:</div> <div className="font-bold"> {event.type}</div>
              </Label>
              {/* <Switch id="functional" /> */}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </CardFooter>
        </Card>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="font-bold text-xl">{event.name}</DrawerTitle>
          <DrawerDescription>{event.desc}</DrawerDescription>
        </DrawerHeader>
        {/* <ProfileForm className="px-4" /> */}
        <form className="px-4 grid items-start gap-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="necessary" className="flex flex-col space-y-1">
              <span>{extractDate(event.date)}</span>
            </Label>
            <span>{extractTime(event.date)}</span>
            {/* <Switch id="necessary" defaultChecked /> */}
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="functional" className="flex flex-row space-x-2">
              <div>Venue:</div> <div className="font-bold"> {event.venue}</div>
            </Label>
            {/* <Switch id="functional" /> */}
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="functional" className="flex flex-row space-x-2">
              <div>Type:</div> <div className="font-bold"> {event.type}</div>
            </Label>
            {/* <Switch id="functional" /> */}
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
