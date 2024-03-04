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
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { set } from "react-hook-form";

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
  email: string;
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
  const [isOrganizer, setIsOrganizer] = React.useState(false);
  const [isVolunteer, setIsVolunteer] = React.useState(false);
  const [isParticipant, setIsParticipant] = React.useState(false);

  function volunteer(id: string) {
    if (!isVolunteer) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/volunteers/volunteer`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          event_id: id,
        }),
      }).then((res) => {
        if (!res.ok) {
          setIsVolunteer(true);
          if (res.status === 409) {
            alert("You are already registered as a participant");
          }
          else if (res.status === 406) {
            alert("Already registered as a volunteer");
          }
          return Promise.reject();
        }
        return res.json();
      }).then((data) => {
        setIsVolunteer(true);
      });
    }
  }

  function register(id: string) {
    if (!isParticipant) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events/register/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            setIsParticipant(true);
            if (res.status === 409) {
              alert("You are already registered as a volunteer");
            }
            else if (res.status === 406) {
              alert("Already registered as a participant");
            }
            return Promise.reject();
          }
          return res.json();
        }).then((data) => {
          setIsParticipant(true);
        });
    }
  }

  React.useEffect(() => {
    if (UserRole === "organizer") {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/events/registrations/${event.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            setIsOrganizer(true);
            return res.json();
          } else {
            setIsOrganizer(false);
            return Promise.reject();
          }
        })
        .then((data) => {
          setParticipantList(data);
        });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    if (UserRole === "organizer") {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/volunteers/all/${event.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return Promise.reject();
          }
        })
        .then((data) => {
          console.log(data);
          setVolunteerList(data);
        });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
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
              <Button
                type="button"
                onClick={() => register(event.id)}
                disabled={isParticipant}
              >
                Register
              </Button>
            )}
            {UserRole === "student" && (
              <Button
                type="button"
                onClick={() => {
                  volunteer(event.id);
                }}
                disabled={isVolunteer}
              >
                Volunteer
              </Button>
            )}

            {isOrganizer && UserRole === "organizer" && (
              <div className="grid gap-2">
                {!VolunteerList && (
                  //print no empty list
                  <Label htmlFor="username">No volunteers as of now</Label>
                )}
                {VolunteerList && (
                  <>
                    <Label htmlFor="username">Volunteers</Label>
                    <ul>
                      {VolunteerList.map((volunteer) => (
                        <li key={volunteer.roll}>
                          {volunteer.name} {volunteer.roll} {volunteer.dept}{" "}
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
                        <li key={participant.email}>
                          {participant.name} {participant.email}{" "}
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
            <Button
              type="button"
              onClick={() => register(event.id)}
              disabled={isParticipant}
            >
              Register
            </Button>
          )}
          {UserRole === "student" && (
            <Button
              type="button"
              onClick={() => {
                volunteer(event.id);
              }}
              disabled={isVolunteer}
            >
              Volunteer
            </Button>
          )}
          {isOrganizer && UserRole === "organizer" && (
            <div className="grid gap-2">
              {!VolunteerList && (
                //print no empty list
                <Label htmlFor="username">No volunteers as of now</Label>
              )}
              {/* {console.log(VolunteerList);console.log("hey")} */}
              {!VolunteerList && (
                //print no empty list
                <Label htmlFor="username">No volunteers as of now</Label>
              )}
              {VolunteerList && (
                <>
                  <Label htmlFor="username">Volunteers</Label>
                  <ul>
                    {VolunteerList.map((volunteer) => (
                      <li key={volunteer.roll}>
                        {volunteer.name} {volunteer.roll} {volunteer.dept}{" "}
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
                      <li key={participant.email}>
                        {participant.name} {participant.email}
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
