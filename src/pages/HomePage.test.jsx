import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import store from "../store";
import { BeautifulTheme } from "../theme/BeautifulTheme";
import HomePage from "./HomePage";

function renderHomePage(loaderData = []) {
    const router = createMemoryRouter(
        [
            {
                path: "/",
                element: <HomePage />,
                loader: () => loaderData,
            },
        ],
        { initialEntries: ["/"] }
    );

    return render(
        <Provider store={store}>
            <ThemeProvider theme={BeautifulTheme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </Provider>
    );
}

describe("HomePage", () => {
    test("renders 2026 Season Recap card before Health and Wellness Certificate card with safe external album link", async () => {
        renderHomePage([]);

        const recapHeading = await screen.findByRole("heading", {
            name: /2026 Season Recap/i,
        });
        const certHeading = screen.getByRole("heading", {
            name: /Health and Wellness Certificate/i,
        });

        expect(
            recapHeading.compareDocumentPosition(certHeading) &
                Node.DOCUMENT_POSITION_FOLLOWING
        ).toBeTruthy();

        const addPhotosLink = screen.getByRole("link", {
            name: /Add Photos to 2026 Album/i,
        });
        expect(addPhotosLink).toHaveAttribute(
            "href",
            "https://photos.app.goo.gl/FVQJgPuNaUdKuW5PA"
        );
        expect(addPhotosLink).toHaveAttribute("target", "_blank");
        expect(addPhotosLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    test("renders 3-step Google Photos instructions on the 2026 Season Recap card", async () => {
        renderHomePage([]);

        await screen.findByRole("heading", { name: /2026 Season Recap/i });
        expect(screen.getByText(/open Google Photos/i)).toBeInTheDocument();
        expect(screen.getByText(/Sign in to Google and tap/i)).toBeInTheDocument();
        expect(screen.getByText(/pick your photos or videos/i)).toBeInTheDocument();
    });

    test("retains Certificate QR code and Jotform link in both off-season and active class states", async () => {
        renderHomePage([]);

        expect(
            await screen.findByAltText("Health and Wellness Certificate QR Code")
        ).toBeInTheDocument();

        const certLink = screen.getByRole("link", { name: /Or Click Here/i });
        expect(certLink).toHaveAttribute(
            "href",
            "https://form.jotform.com/231454157893059"
        );
        expect(certLink).toHaveAttribute("target", "_blank");
        expect(certLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    test("renders both 2026 Season Recap and Health and Wellness Certificate cards with active class data", async () => {
        renderHomePage([
            {
                id: 1,
                title: "2026 Training Season",
                description: "Weekly training sessions",
                date: "2026-04-01",
            },
        ]);

        expect(
            await screen.findByRole("heading", { name: /2026 Season Recap/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("heading", {
                name: /Health and Wellness Certificate/i,
            })
        ).toBeInTheDocument();
    });
});
