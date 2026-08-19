"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

// Pages that don't require authentication
const PUBLIC_PATHS = ["/signup", "/login", "/forgot-password", "/onboarding"];

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem("oja_worker_auth");
        const isPublicPath = PUBLIC_PATHS.some((p) => pathname?.startsWith(p));

        if (!isAuthenticated && !isPublicPath) {
            // First-time user: send to signup
            router.replace("/signup");
        }
    }, [pathname, router]);

    return <>{children}</>;
}
