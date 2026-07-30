import { Clock, Mail, MapPin, Phone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
  return (
    <main className="container mx-auto max-w-7xl px-4 py-16">
      {/* Hero */}
      <section className="mb-16 text-center">
        <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
          Contact Us
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
          We&apos;d love to hear from you
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
          Have a question about renting sports equipment, becoming a provider, or your recent order?
          Our support team is here to help.
        </p>
      </section>

      <div className="grid gap-10 lg:grid-cols-3">
        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardContent className="flex gap-4 p-6">
              <Mail className="mt-1 h-5 w-5 text-primary" />

              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-sm text-muted-foreground">support@gearup.com</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex gap-4 p-6">
              <Phone className="mt-1 h-5 w-5 text-primary" />

              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-sm text-muted-foreground">+880 1700-000000</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex gap-4 p-6">
              <MapPin className="mt-1 h-5 w-5 text-primary" />

              <div>
                <h3 className="font-semibold">Office</h3>
                <p className="text-sm text-muted-foreground">Dhaka, Bangladesh</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex gap-4 p-6">
              <Clock className="mt-1 h-5 w-5 text-primary" />

              <div>
                <h3 className="font-semibold">Support Hours</h3>
                <p className="text-sm text-muted-foreground">
                  Sat – Thu
                  <br />
                  9:00 AM – 6:00 PM
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="lg:col-span-2">
          <CardContent className="p-8">
            <h2 className="mb-2 text-2xl font-bold">Send us a message</h2>

            <p className="mb-8 text-muted-foreground">
              Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>

            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>

                  <Input id="name" placeholder="John Doe" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>

                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>

                <Input id="subject" placeholder="How can we help?" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>

                <Textarea id="message" rows={7} placeholder="Write your message..." />
              </div>

              <Button type="submit" size="lg" className="w-full md:w-auto">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <section className="mt-20">
        <h2 className="mb-8 text-center text-3xl font-bold">Frequently Asked Questions</h2>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold">How do rentals work?</h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Browse available gear, choose your rental dates, complete secure payment, and pick
                up or receive your equipment.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold">Can I cancel my booking?</h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Yes. Cancellation eligibility depends on the provider&apos;s rental policy and the
                booking status.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold">Want to become a provider?</h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Register as a Provider during sign-up and start listing your sports equipment for
                rent.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
