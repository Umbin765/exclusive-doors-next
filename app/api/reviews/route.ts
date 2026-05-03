import { NextResponse } from 'next/server';

export const revalidate = 3600; // re-fetch every hour

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json({ error: 'Missing API config' }, { status: 500 });
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&language=ro&reviews_sort=newest&key=${apiKey}`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  const data = await res.json();

  if (data.status !== 'OK') {
    return NextResponse.json({ error: data.status }, { status: 500 });
  }

  return NextResponse.json({
    name: data.result.name,
    rating: data.result.rating,
    totalReviews: data.result.user_ratings_total,
    reviews: data.result.reviews,
  });
}
