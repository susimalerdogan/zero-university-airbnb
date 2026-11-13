"use client";

import { FormEvent, useRef, useState } from "react";
import {
  ArrowUp,
  CalendarDays,
  Clock3,
  MapPin,
  RotateCcw,
  Sparkles,
  Utensils,
} from "lucide-react";

type ChatState = "idle" | "thinking" | "success" | "error";

const tripRequest = "Plan a weekend in Kyoto for two";

function StayCard() {
  return (
    <article className="card card-border overflow-hidden border-base-300 bg-base-100 shadow-sm">
      <div className="h-32 border-t-4 border-primary bg-base-200 sm:h-40">
        <div className="flex h-full items-center justify-center text-base-content/35">
          <MapPin aria-hidden="true" className="mr-2 size-5" />
          <span className="text-xs font-semibold uppercase tracking-[0.16em]">Gion, Kyoto</span>
        </div>
      </div>
      <div className="card-body gap-2 p-5 sm:p-6">
        <p className="text-xl font-extrabold tracking-tight sm:text-2xl">11 Apr – 13 Apr 2025 · 2 nights</p>
        <div>
          <h3 className="font-bold">Restored machiya townhouse near Gion</h3>
          <p className="flex items-center gap-1.5 text-sm text-base-content/60">
            <MapPin aria-hidden="true" className="size-3.5" /> Entire townhouse · Gion
          </p>
        </div>
        <p className="font-semibold">$168 USD <span className="font-normal text-base-content/55">/ night · $366 total</span></p>
        <p className="text-sm leading-relaxed text-base-content/65">Private garden and cedar soaking tub · Hosted by Kenji · 4.92 from 214 reviews</p>
      </div>
    </article>
  );
}

function ExperienceCard() {
  return (
    <article className="card card-border overflow-hidden border-base-300 bg-base-100 shadow-sm sm:card-side">
      <div className="flex h-24 items-center justify-center bg-base-200 text-base-content/35 sm:h-auto sm:w-32 sm:shrink-0">
        <CalendarDays aria-hidden="true" className="size-7" />
      </div>
      <div className="card-body gap-4 p-5 sm:p-6">
        <div>
          <h3 className="card-title text-xl font-extrabold tracking-tight">Throw a tea bowl in a Kiyomizu pottery studio</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-base-content/55">
            <Clock3 aria-hidden="true" className="size-3.5" /> 1.5 hours · $72 per guest
          </p>
        </div>
        <div className="space-y-3 text-sm">
          <div className="grid grid-cols-[3.25rem_1fr] gap-3">
            <span className="badge badge-secondary badge-sm font-bold">SAT</span>
            <p className="leading-relaxed">12 Apr · 14:00 · Craft experience</p>
          </div>
          <div className="grid grid-cols-[3.25rem_1fr] gap-3">
            <span className="badge badge-secondary badge-sm font-bold">MEET</span>
            <p className="leading-relaxed">Gojozaka bus stop, Higashiyama side</p>
          </div>
          <p className="text-base-content/55">Host details coming soon · 4.84 rating · Spots open</p>
        </div>
      </div>
    </article>
  );
}

function FoodCard() {
  return (
    <article className="card card-border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body grid grid-cols-[1fr_auto] gap-x-5 p-5 sm:p-6">
        <div>
          <h3 className="card-title text-xl font-extrabold tracking-tight">Sagano Yudofu-tei</h3>
          <p className="mt-2 font-bold text-warning">Lunch · Tofu · $$</p>
        </div>
        <div className="flex size-16 items-center justify-center rounded-full bg-base-200 text-base-content/35">
          <Utensils aria-hidden="true" className="size-6" />
        </div>
        <p className="col-span-2 mt-4 text-sm leading-relaxed text-base-content/65">$64 estimated for two · Arashiyama · 25 min from stay</p>
        <p className="col-span-2 mt-1 text-sm font-medium text-base-content/55">Booking details not provided.</p>
      </div>
    </article>
  );
}

function ThinkingBubble() {
  return (
    <div className="chat chat-start" aria-live="polite">
      <div className="chat-header mb-2 flex items-center gap-2 text-xs font-bold text-base-content/55">
        <Sparkles aria-hidden="true" className="size-3.5 text-primary" /> Trip planner
      </div>
      <div className="chat-bubble flex items-center gap-3 bg-base-100 text-base-content shadow-sm" role="status" aria-label="Trip planner is thinking">
        <span className="loading loading-dots loading-sm text-primary" aria-hidden="true" />
        <span className="text-sm font-medium">Building your Kyoto weekend…</span>
      </div>
    </div>
  );
}

export function TripPlanner({ failOnce }: { failOnce: boolean }) {
  const [message, setMessage] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [state, setState] = useState<ChatState>("idle");
  const failedAlready = useRef(false);

  const runRequest = (text: string) => {
    setSubmittedMessage(text);
    setState("thinking");
    window.setTimeout(() => {
      if (failOnce && !failedAlready.current) {
        failedAlready.current = true;
        setState("error");
      } else {
        setState("success");
      }
    }, 1250);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage || state === "thinking") return;
    runRequest(trimmedMessage);
    setMessage("");
  };

  return (
    <main className="min-h-screen bg-base-200 px-4 py-6 sm:px-6 sm:py-10">
      <section className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-3xl flex-col overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-xl sm:min-h-[calc(100vh-5rem)]">
        <header className="flex items-center justify-between border-b border-base-300 px-5 py-4 sm:px-8 sm:py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Weekend planner</p>
            <h1 className="mt-1 text-xl font-extrabold tracking-tight sm:text-2xl">Kyoto, thoughtfully planned</h1>
          </div>
          <div className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-content">
            <Sparkles aria-hidden="true" className="size-5" />
          </div>
        </header>

        <div className="flex-1 space-y-6 overflow-y-auto bg-base-200/55 px-4 py-6 sm:px-8 sm:py-8" aria-busy={state === "thinking"}>
          <div className="chat chat-start">
            <div className="chat-header mb-2 text-xs font-bold text-base-content/55">Trip planner</div>
            <div className="chat-bubble max-w-md bg-base-100 text-base-content shadow-sm">
              Tell me where you’d like to go and I’ll shape a stay, an experience and a table worth booking.
            </div>
          </div>

          {submittedMessage && (
            <div className="chat chat-end">
              <div className="chat-header mb-2 text-xs font-bold text-base-content/55">You</div>
              <div className="chat-bubble chat-bubble-neutral">{submittedMessage}</div>
            </div>
          )}

          {state === "thinking" && <ThinkingBubble />}

          {state === "error" && (
            <div className="chat chat-start">
              <div className="chat-header mb-2 text-xs font-bold text-base-content/55">Trip planner</div>
              <div className="chat-bubble max-w-lg bg-base-100 text-base-content shadow-sm">
                <p>Sorry, I couldn’t put your Kyoto weekend together just now. Let’s give it another go.</p>
                <div className="mt-4 flex justify-end">
                  <button className="btn btn-primary btn-sm" type="button" onClick={() => runRequest(submittedMessage || tripRequest)}>
                    <RotateCcw aria-hidden="true" className="size-4" /> Try again
                  </button>
                </div>
              </div>
            </div>
          )}

          {state === "success" && (
            <div className="space-y-4">
              <div className="chat chat-start">
                <div className="chat-header mb-2 text-xs font-bold text-base-content/55">Trip planner</div>
                <div className="chat-bubble max-w-md bg-base-100 text-base-content shadow-sm">A calm two-night Kyoto escape, ready for you.</div>
              </div>
              <div className="grid w-full gap-4" aria-label="Kyoto weekend recommendations">
                <StayCard />
                <ExperienceCard />
                <FoodCard />
              </div>
            </div>
          )}
        </div>

        <form className="border-t border-base-300 bg-base-100 p-4 sm:p-5" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="trip-message">Describe your trip</label>
          <div className="input input-lg flex w-full items-center gap-3 border-base-300 bg-base-100 pr-2 focus-within:border-primary focus-within:outline-2 focus-within:outline-primary/20">
            <input
              id="trip-message"
              className="min-w-0 flex-1 bg-transparent text-base outline-none disabled:cursor-not-allowed disabled:opacity-50"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Plan a weekend in Kyoto for two"
              disabled={state === "thinking"}
              autoComplete="off"
            />
            <button
              className="btn btn-primary btn-circle btn-sm"
              type="submit"
              disabled={!message.trim() || state === "thinking"}
              aria-label={state === "thinking" ? "Trip planner is thinking" : "Send message"}
            >
              {state === "thinking" ? <span className="loading loading-spinner loading-xs" aria-hidden="true" /> : <ArrowUp aria-hidden="true" className="size-4" />}
            </button>
          </div>
          <p className="mt-2 text-center text-xs text-base-content/45">Suggestions are sample itinerary data.</p>
        </form>
      </section>
    </main>
  );
}
