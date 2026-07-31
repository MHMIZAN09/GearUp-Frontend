import {
  ArrowLeft,
  BadgeCheck,
  Boxes,
  CalendarDays,
  Mail,
  MapPin,
  PackageCheck,
  Phone,
  ShieldCheck,
  Star,
  Store,
  Tag,
  UserRound,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import RentalForm from '../../../(dashboard)/_components/rentals/rental-form';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getGearById } from '@/service/gear/gear.service';

interface GearReview {
  id: string;
  rating: number;
  comment: string;
  customer: {
    name: string;
  };
}

interface GearDetails {
  id: string;
  name: string;
  description: string;
  brand: string;
  imageUrl: string;
  pricePerDay: string;
  quantityTotal: number;
  quantityAvailable: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  category: {
    id?: string;
    name: string;
  };
  provider: {
    id: string;
    name: string;
    email?: string | null;
    contactNumber?: string | null;
    address?: string | null;
  };
  reviews: GearReview[];
  _count?: {
    reviews?: number;
  };
}

const formatDate = (date?: string) => {
  if (!date) {
    return 'Recently listed';
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
};

const getAvailabilityPercent = (available: number, total: number) => {
  if (!total) {
    return 0;
  }

  return Math.min(100, Math.round((available / total) * 100));
};

const getAverageRating = (reviews: GearReview[]) => {
  if (!reviews.length) {
    return 'New';
  }

  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (total / reviews.length).toFixed(1);
};

const GearDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const result = await getGearById(id);

  if (!result?.success || !result?.data) {
    notFound();
  }

  const gear = result.data as GearDetails;
  const reviews = gear.reviews ?? [];
  const availabilityPercent = getAvailabilityPercent(gear.quantityAvailable, gear.quantityTotal);
  const isAvailable = gear.status === 'AVAILABLE';

  return (
    <main className="bg-background">
      <section className="border-b bg-muted/20">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <Button asChild variant="ghost" className="rounded-full">
            <Link href="/gear">
              <ArrowLeft />
              Back to gear
            </Link>
          </Button>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-4 py-8 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
          <div className="space-y-8">
            <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
              <div className="relative aspect-[16/11] min-h-[320px] bg-muted">
                <Image
                  src={gear.imageUrl}
                  alt={gear.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 760px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/20" />

                <div className="absolute left-5 right-5 top-5 flex flex-wrap items-center justify-between gap-3">
                  <Badge className="rounded-full bg-background/90 px-3 py-1 text-foreground hover:bg-background">
                    {gear.category.name}
                  </Badge>
                  <Badge
                    variant={isAvailable ? 'default' : 'destructive'}
                    className="rounded-full px-3 py-1"
                  >
                    {gear.status}
                  </Badge>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                  <div className="max-w-3xl">
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium text-white backdrop-blur">
                        <Tag className="size-4" />
                        {gear.brand}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium text-white backdrop-blur">
                        <Store className="size-4" />
                        {gear.provider.name}
                      </span>
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                      {gear.name}
                    </h1>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 p-5 sm:grid-cols-4 sm:p-6">
                <div className="rounded-xl border bg-background p-4">
                  <p className="text-sm text-muted-foreground">Price / day</p>
                  <p className="mt-1 text-3xl font-bold text-primary">৳{gear.pricePerDay}</p>
                </div>

                <div className="rounded-xl border bg-background p-4">
                  <p className="text-sm text-muted-foreground">Available</p>
                  <p className="mt-1 text-2xl font-bold">
                    {gear.quantityAvailable}/{gear.quantityTotal}
                  </p>
                </div>

                <div className="rounded-xl border bg-background p-4">
                  <p className="text-sm text-muted-foreground">Reviews</p>
                  <p className="mt-1 flex items-center gap-2 text-2xl font-bold">
                    <Star className="size-5 fill-primary text-primary" />
                    {getAverageRating(reviews)}
                  </p>
                </div>

                <div className="rounded-xl border bg-background p-4">
                  <p className="text-sm text-muted-foreground">Listed</p>
                  <p className="mt-1 font-semibold">{formatDate(gear.createdAt)}</p>
                </div>
              </div>
            </div>

            <section className="grid gap-6 xl:grid-cols-[1fr_320px]">
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ShieldCheck className="size-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Rental overview</h2>
                    <p className="text-sm text-muted-foreground">
                      Important details before booking
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-base leading-7 text-muted-foreground">
                  {gear.description}
                </p>

                <div className="mt-6 rounded-xl border bg-background p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-medium">
                      <Boxes className="size-4 text-primary" />
                      Stock health
                    </span>
                    <span className="text-muted-foreground">{availabilityPercent}% ready</span>
                  </div>
                  <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${availabilityPercent}%` }}
                    />
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border bg-background p-4">
                    <PackageCheck className="size-5 text-emerald-600" />
                    <p className="mt-3 font-semibold">Live inventory</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Quantity updates from provider stock.
                    </p>
                  </div>
                  <div className="rounded-xl border bg-background p-4">
                    <CalendarDays className="size-5 text-sky-600" />
                    <p className="mt-3 font-semibold">Daily booking</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Choose dates and quantity before request.
                    </p>
                  </div>
                  <div className="rounded-xl border bg-background p-4">
                    <BadgeCheck className="size-5 text-amber-600" />
                    <p className="mt-3 font-semibold">Provider listed</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Rental handled by {gear.provider.name}.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <h2 className="text-xl font-bold">Provider</h2>
                <div className="mt-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <UserRound className="mt-0.5 size-5 text-primary" />
                    <div className="min-w-0">
                      <p className="font-semibold">{gear.provider.name}</p>
                      <p className="text-sm text-muted-foreground">Equipment owner</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 size-5 text-primary" />
                    <div className="min-w-0">
                      <p className="break-words font-medium">
                        {gear.provider.email ?? 'Not provided'}
                      </p>
                      <p className="text-sm text-muted-foreground">Email</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 size-5 text-primary" />
                    <div className="min-w-0">
                      <p className="font-medium">
                        {gear.provider.contactNumber ?? 'Not provided'}
                      </p>
                      <p className="text-sm text-muted-foreground">Phone</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-5 text-primary" />
                    <div className="min-w-0">
                      <p className="font-medium">{gear.provider.address ?? 'Not provided'}</p>
                      <p className="text-sm text-muted-foreground">Address</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Customer reviews</h2>
                  <p className="text-sm text-muted-foreground">
                    {reviews.length} review{reviews.length === 1 ? '' : 's'} for this gear
                  </p>
                </div>
              </div>

              {reviews.length === 0 ? (
                <div className="mt-6 rounded-xl border bg-background px-6 py-12 text-center">
                  <Star className="mx-auto size-9 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">No reviews yet</h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                    This gear is ready for its first customer story.
                  </p>
                </div>
              ) : (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {reviews.map((review) => (
                    <Card key={review.id} className="bg-background">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between gap-4">
                          <p className="font-semibold">{review.customer.name}</p>
                          <Badge variant="secondary" className="gap-1 rounded-full">
                            <Star className="size-3.5 fill-primary text-primary" />
                            {review.rating}
                          </Badge>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                          {review.comment}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          </div>

          <aside className="lg:sticky lg:top-6">
            <div className="mb-4 rounded-2xl border bg-card p-5 shadow-sm">
              <p className="text-sm text-muted-foreground">Starts at</p>
              <div className="mt-1 flex items-end justify-between gap-4">
                <p className="text-4xl font-bold text-primary">৳{gear.pricePerDay}</p>
                <Badge
                  variant={isAvailable ? 'default' : 'destructive'}
                  className="rounded-full"
                >
                  {isAvailable ? 'Ready to rent' : gear.status}
                </Badge>
              </div>
            </div>

            <RentalForm
              gearId={gear.id}
              pricePerDay={Number(gear.pricePerDay)}
              quantityAvailable={gear.quantityAvailable}
            />
          </aside>
        </div>
      </section>
    </main>
  );
};

export default GearDetailsPage;
