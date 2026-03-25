const STORAGE_KEY = "hbnb_access_token";

const FALLBACK_PLACES = [
    {
        id: "demo-loft",
        title: "Canal Loft",
        price: 145,
        description: "Soft daylight, a warm oak palette, and enough calm to properly switch off.",
        location: "Paris, France",
        hostName: "Clara D.",
        tag: "Light-filled loft",
        amenities: ["WiFi", "Kitchen", "Balcony"],
    },
    {
        id: "demo-house",
        title: "Maison du Sud",
        price: 190,
        description: "A plant-rich stay for slow mornings, open windows, and unhurried dinners.",
        location: "Aix-en-Provence, France",
        hostName: "Malo T.",
        tag: "Family retreat",
        amenities: ["Pool", "Garden", "Parking"],
    },
    {
        id: "demo-studio",
        title: "Studio Horizon",
        price: 98,
        description: "Compact, quiet, and carefully designed for solo escapes or easy work trips.",
        location: "Bordeaux, France",
        hostName: "Iris L.",
        tag: "City studio",
        amenities: ["WiFi", "Coffee", "Desk"],
    },
];

const FALLBACK_REVIEWS = {
    "demo-loft": [
        { userName: "Nina R.", rating: 5, text: "Beautifully quiet in the evening, with a layout that feels instantly relaxing." },
        { userName: "Adam K.", rating: 4, text: "Very comfortable and easy to settle into, especially for a weekend in the city." },
    ],
    "demo-house": [
        { userName: "Lea V.", rating: 5, text: "The terrace and the soft palette made the whole stay feel generous and calm." },
    ],
    "demo-studio": [
        { userName: "Sam B.", rating: 4, text: "Simple, bright, and exactly what I needed for a short trip." },
    ],
};

document.addEventListener("DOMContentLoaded", () => {
    initAuthLink();

    const page = document.body.dataset.page;

    if (page === "index") {
        initIndexPage();
    } else if (page === "login") {
        initLoginPage();
    } else if (page === "place") {
        initPlacePage();
    } else if (page === "add-review") {
        initAddReviewPage();
    }
});

function getToken() {
    return window.localStorage.getItem(STORAGE_KEY);
}

function setToken(token) {
    window.localStorage.setItem(STORAGE_KEY, token);
}

function clearToken() {
    window.localStorage.removeItem(STORAGE_KEY);
}

function initAuthLink() {
    const authLink = document.getElementById("auth-link");
    if (!authLink) {
        return;
    }

    if (getToken()) {
        authLink.textContent = "Logout";
        authLink.href = "/index.html";
        authLink.addEventListener("click", (event) => {
            event.preventDefault();
            clearToken();
            window.location.href = "/index.html";
        });
    } else {
        authLink.textContent = "Login";
        authLink.href = "/login.html";
    }
}

async function initIndexPage() {
    const grid = document.getElementById("places-grid");
    if (!grid) {
        return;
    }

    const places = await loadPlaces();
    grid.innerHTML = "";

    places.forEach((place) => {
        const article = document.createElement("article");
        article.className = "place-card";
        article.innerHTML = `
            <p class="card-kicker">${escapeHtml(place.tag || place.location || "Curated stay")}</p>
            <h3>${escapeHtml(place.title)}</h3>
            <p class="price-tag">${formatPrice(place.price)} / night</p>
            <p class="card-description">${escapeHtml(place.description)}</p>
            <a class="details-button" href="/place.html?id=${encodeURIComponent(place.id)}">View Details</a>
        `;
        grid.appendChild(article);
    });
}

function initLoginPage() {
    const form = document.getElementById("login-form");
    const message = document.getElementById("login-message");
    if (!form || !message) {
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        message.textContent = "Signing you in...";

        const email = form.email.value.trim();
        const password = form.password.value;

        try {
            const data = await fetchJson("/api/v1/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });

            setToken(data.access_token);
            message.textContent = "Login successful. Redirecting...";

            const next = new URLSearchParams(window.location.search).get("next");
            window.setTimeout(() => {
                window.location.href = next || "/index.html";
            }, 500);
        } catch (error) {
            message.textContent = error.message || "Unable to log in with these credentials.";
        }
    });
}

async function initPlacePage() {
    const place = await resolvePlaceFromQuery();
    renderPlace(place);
    await renderReviews(place.id);
    updateReviewAction(place.id);
}

async function initAddReviewPage() {
    const token = getToken();
    const form = document.getElementById("review-form");
    const message = document.getElementById("review-message");
    const authRequired = document.getElementById("auth-required");
    const select = document.getElementById("place_id");
    const rating = document.getElementById("rating");

    if (!form || !message || !authRequired || !select || !rating) {
        return;
    }

    select.required = true;
    rating.required = true;

    const places = await loadPlaces();
    const requestedPlaceId = new URLSearchParams(window.location.search).get("place_id");

    select.innerHTML = "";
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Choose a place";
    placeholder.selected = !requestedPlaceId;
    select.appendChild(placeholder);

    places.forEach((place) => {
        const option = document.createElement("option");
        option.value = place.id;
        option.textContent = `${place.title} · ${formatPrice(place.price)} / night`;
        if (requestedPlaceId && requestedPlaceId === place.id) {
            option.selected = true;
            placeholder.selected = false;
        }
        select.appendChild(option);
    });

    if (!token) {
        authRequired.classList.remove("hidden");
        authRequired.innerHTML = `You need to <a href="/login.html?next=${encodeURIComponent(window.location.pathname + window.location.search)}">log in</a> before sending a review.`;
        form.classList.add("hidden");
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        message.textContent = "Publishing your review...";

        try {
            await fetchJson("/api/v1/reviews/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    place_id: form.place_id.value,
                    rating: Number(form.rating.value),
                    text: form.text.value.trim(),
                }),
            });

            message.textContent = "Review published. Redirecting to the place page...";
            window.setTimeout(() => {
                window.location.href = `/place.html?id=${encodeURIComponent(form.place_id.value)}`;
            }, 700);
        } catch (error) {
            message.textContent = error.message || "Unable to publish your review right now.";
        }
    });
}

async function resolvePlaceFromQuery() {
    const id = new URLSearchParams(window.location.search).get("id");

    if (!id) {
        const places = await loadPlaces();
        return places[0];
    }

    try {
        const place = await fetchJson(`/api/v1/places/${id}`);
        return normalizePlace(place);
    } catch (error) {
        return FALLBACK_PLACES.find((item) => item.id === id) || FALLBACK_PLACES[0];
    }
}

function renderPlace(place) {
    const title = document.getElementById("place-title");
    const price = document.getElementById("place-price");
    const host = document.getElementById("place-host");
    const location = document.getElementById("place-location");
    const description = document.getElementById("place-description");
    const tag = document.getElementById("place-tag");
    const amenities = document.getElementById("place-amenities");

    if (!title || !price || !host || !location || !description || !tag || !amenities) {
        return;
    }

    title.textContent = place.title;
    price.textContent = `${formatPrice(place.price)} / night`;
    host.textContent = place.hostName || "HBnB Host";
    location.textContent = place.location || "France";
    description.textContent = place.description;
    tag.textContent = place.tag || "Thoughtful stay";

    amenities.innerHTML = "";
    (place.amenities.length ? place.amenities : ["WiFi", "Comfort", "Quiet"]).forEach((item) => {
        const chip = document.createElement("li");
        chip.textContent = item;
        amenities.appendChild(chip);
    });
}

async function renderReviews(placeId) {
    const list = document.getElementById("reviews-list");
    if (!list) {
        return;
    }

    const reviews = await loadReviews(placeId);
    list.innerHTML = "";

    if (!reviews.length) {
        list.innerHTML = `
            <div class="review-card">
                <div class="review-meta">
                    <strong>No reviews yet</strong>
                    <span>Be the first</span>
                </div>
                <p>This place does not have any published review yet.</p>
            </div>
        `;
        return;
    }

    reviews.forEach((review) => {
        const card = document.createElement("div");
        card.className = "review-card";
        card.innerHTML = `
            <div class="review-meta">
                <strong>${escapeHtml(review.userName)}</strong>
                <span>${escapeHtml(String(review.rating))} / 5</span>
            </div>
            <p>${escapeHtml(review.text)}</p>
        `;
        list.appendChild(card);
    });
}

function updateReviewAction(placeId) {
    const action = document.getElementById("review-action");
    if (!action) {
        return;
    }

    if (getToken()) {
        action.textContent = "Add Review";
        action.href = `/add_review.html?place_id=${encodeURIComponent(placeId)}`;
    } else {
        action.textContent = "Login to Add Review";
        action.href = `/login.html?next=${encodeURIComponent(`/add_review.html?place_id=${placeId}`)}`;
    }
}

async function loadPlaces() {
    try {
        const data = await fetchJson("/api/v1/places/");
        if (Array.isArray(data) && data.length) {
            return data.map(normalizePlace);
        }
    } catch (error) {
        // Fallback below keeps the UI useful even when the API is empty or offline.
    }

    return FALLBACK_PLACES;
}

async function loadReviews(placeId) {
    try {
        const reviews = await fetchJson("/api/v1/reviews/");
        const placeReviews = Array.isArray(reviews)
            ? reviews.filter((review) => review.place_id === placeId)
            : [];

        if (!placeReviews.length) {
            return FALLBACK_REVIEWS[placeId] || [];
        }

        const userCache = new Map();

        return await Promise.all(placeReviews.map(async (review) => {
            if (!userCache.has(review.user_id)) {
                userCache.set(
                    review.user_id,
                    fetchJson(`/api/v1/users/${review.user_id}`).catch(() => null),
                );
            }

            const user = await userCache.get(review.user_id);
            const userName = user
                ? `${user.first_name} ${user.last_name}`
                : "Guest reviewer";

            return {
                userName,
                rating: review.rating,
                text: review.text,
            };
        }));
    } catch (error) {
        return FALLBACK_REVIEWS[placeId] || [];
    }
}

function normalizePlace(place) {
    const amenities = Array.isArray(place.amenities)
        ? place.amenities.map((item) => typeof item === "string" ? item : item.name).filter(Boolean)
        : [];

    const owner = place.owner
        ? `${place.owner.first_name} ${place.owner.last_name}`
        : "HBnB Host";

    return {
        id: place.id || crypto.randomUUID(),
        title: place.title || "Untitled stay",
        price: Number(place.price || 0),
        description: place.description || "A calm, well-balanced stay designed for simple comfort.",
        location: place.location || "France",
        hostName: owner,
        tag: amenities[0] || "Curated stay",
        amenities,
    };
}

async function fetchJson(url, options = {}) {
    const headers = new Headers(options.headers || {});
    if (options.body && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
        const message = payload.error || payload.message || "Request failed.";
        throw new Error(message);
    }

    return payload;
}

function formatPrice(value) {
    return `${Math.round(Number(value || 0))} €`;
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}
