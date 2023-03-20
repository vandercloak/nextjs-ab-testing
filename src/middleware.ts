import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

export const config = {
  matcher: ["/pokemon"],
};

interface ABTest {
  treatments: [{ size: number; route: string; name: string }];
  defaultRoute: string;
  name: string;
  routeTrigger: string;
}

export async function middleware(req: NextRequest) {
  const nextPathname = req.nextUrl.pathname;
  const abTests = (await get("ab_tests")) as unknown as ABTest[];

  const abTest = abTests.find((test) => nextPathname === test.routeTrigger);

  if (!abTest) {
    // No ab test to run.
    return;
  }

  const cookieKey = `flag-${abTest.name}`;

  const treatment = getTreatment(abTest, req.cookies.get(cookieKey)?.value);

  // Get the cookie from the request or pick a value form the A/B test.
  const newPathname = treatment?.route;

  if (!newPathname) return;

  // Set the pathname based on the split and cookie value
  req.nextUrl.pathname = newPathname;

  const res = NextResponse.rewrite(req.nextUrl);

  // Add the cookie if it's not there
  if (!req.cookies.get(cookieKey)) {
    res.cookies.set(cookieKey, treatment!.name);
  }

  return res;
}

export function getTreatment(
  abTest: ABTest,
  cookieValue?: string
): ABTest["treatments"][number] | undefined {
  const cachedTreatment =
    cookieValue &&
    abTest.treatments.find((treatment) => treatment.name === cookieValue);

  // We already have a treatment stored as a cookie. We will use
  // that treatment rather than deciding on a new one below.
  if (cachedTreatment) {
    return cachedTreatment;
  }

  // Get a number between 0 and 100.
  let n = cryptoRandom() * 100;

  return (
    abTest.treatments.find((treatment) => {
      n -= treatment.size;
      return n <= 0;
    }) ||
    abTest.treatments.find(
      (treatment) => treatment.route === abTest.defaultRoute
    )
  );
}

function cryptoRandom() {
  return crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1);
}
