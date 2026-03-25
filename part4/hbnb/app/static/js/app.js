const STORAGE_KEY = "hbnb_access_token";

const PLACE_MEDIA = {
    "demo-loft": {
        title: "Canal Loft",
        price: 145,
        image: "/static/img/places/canal-loft.jpg",
        imagePosition: "50% 58%",
        tag: "Light-filled loft",
        location: "Paris, France",
        hostName: "Clara D.",
        hostSeed: "clara-d",
        description: "Soft daylight, a warm oak palette, and enough calm to properly switch off.",
        amenities: ["WiFi", "Kitchen", "Balcony"],
    },
    "demo-house": {
        title: "Maison du Sud",
        price: 190,
        image: "/static/img/places/maison-du-sud.jpg",
        imagePosition: "48% 52%",
        tag: "Family retreat",
        location: "Aix-en-Provence, France",
        hostName: "Malo T.",
        hostSeed: "malo-t",
        description: "A plant-rich stay for slow mornings, open windows, and unhurried dinners.",
        amenities: ["Pool", "Garden", "Parking"],
    },
    "demo-studio": {
        title: "Studio Horizon",
        price: 98,
        image: "/static/img/places/studio-horizon.jpg",
        imagePosition: "50% 50%",
        tag: "City studio",
        location: "Bordeaux, France",
        hostName: "Iris L.",
        hostSeed: "iris-l",
        description: "Compact, quiet, and carefully designed for solo escapes or easy work trips.",
        amenities: ["WiFi", "Coffee", "Desk"],
    },
};

const PLACE_MEDIA_ORDER = Object.keys(PLACE_MEDIA);

const FALLBACK_PLACES = PLACE_MEDIA_ORDER.map((id) => ({
    id,
    ...PLACE_MEDIA[id],
}));

const FALLBACK_REVIEWS = {
    "demo-loft": [
        {
            userName: "Nina R.",
            userSeed: "nina-r",
            rating: 5,
            text: "Beautifully quiet in the evening, with a layout that feels instantly relaxing.",
        },
        {
            userName: "Adam K.",
            userSeed: "adam-k",
            rating: 4,
            text: "Very comfortable and easy to settle into, especially for a weekend in the city.",
        },
    ],
    "demo-house": [
        {
            userName: "Lea V.",
            userSeed: "lea-v",
            rating: 5,
            text: "The terrace and the soft palette made the whole stay feel generous and calm.",
        },
    ],
    "demo-studio": [
        {
            userName: "Sam B.",
            userSeed: "sam-b",
            rating: 4,
            text: "Simple, bright, and exactly what I needed for a short trip.",
        },
    ],
};

let currentUserPromise = null;

document.addEventListener("DOMContentLoaded", () => {
    void initAuthActions();

    const page = document.body.dataset.page;

    if (page === "index") {
        void initIndexPage();
    } else if (page === "login") {
        initLoginPage();
    } else if (page === "place") {
        void initPlacePage();
    } else if (page === "add-review") {
        void initAddReviewPage();
    }
});

function getToken() {
    return window.localStorage.getItem(STORAGE_KEY);
}

function setToken(token) {
    window.localStorage.setItem(STORAGE_KEY, token);
    currentUserPromise = null;
}

function clearToken() {
    window.localStorage.removeItem(STORAGE_KEY);
    currentUserPromise = null;
}

async function initAuthActions() {
    const container = document.getElementById("auth-actions");
    if (!container) {
        return;
    }

    const token = getToken();
    if (!token) {
        renderGuestAuth(container);
        return;
    }

    const user = await loadCurrentUser();
    renderUserAuth(container, user);
}

function renderGuestAuth(container) {
    container.innerHTML = `
        <a href="/login.html" class="login-button" id="auth-link">Login</a>
    `;
}

function renderUserAuth(container, user) {
    const label = escapeHtml(getUserLabel(user));
    const avatar = escapeHtml(getUserAvatar(user));

    container.innerHTML = `
        <div class="auth-cluster">
            <div class="profile-chip" aria-label="Connected account">
                <img class="user-avatar" src="${avatar}" alt="${label} avatar">
                <span class="profile-meta">
                    <span class="profile-label">Connected</span>
                    <span class="profile-name">${label}</span>
                </span>
            </div>
            <button type="button" class="logout-button" id="logout-button">Logout</button>
        </div>
    `;

    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            clearToken();
            window.location.href = "/index.html";
        });
    }
}

async function loadCurrentUser() {
    if (currentUserPromise) {
        return currentUserPromise;
    }

    const token = getToken();
    if (!token) {
        return null;
    }

    currentUserPromise = (async () => {
        const payload = decodeJwtPayload(token);
        const userId = payload?.sub;

        if (!userId) {
            return { id: "account", userName: "Account" };
        }

        try {
            const user = await fetchJson(`/api/v1/users/${userId}`);
            return user;
        } catch (error) {
            return { id: userId, userName: "Account" };
        }
    })();

    return currentUserPromise;
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
            <a class="place-card-link" href="/place.html?id=${encodeURIComponent(place.id)}" aria-label="View details for ${escapeHtml(place.title)}">
                <div class="place-photo">
                    <img
                        src="${escapeHtml(place.image)}"
                        alt="${escapeHtml(place.title)} interior"
                        style="object-position: ${escapeHtml(place.imagePosition || "50% 50%")};"
                    >
                </div>
                <div class="place-card-body">
                    <p class="card-kicker">${escapeHtml(place.tag)}</p>
                    <h3>${escapeHtml(place.title)}</h3>
                    <p class="price-tag">${formatPrice(place.price)} / night</p>
                    <p class="card-description">${escapeHtml(place.description)}</p>
                    <div class="card-host">
                        <img class="user-avatar" src="${escapeHtml(getUserAvatar(place.host))}" alt="${escapeHtml(place.hostName)} avatar">
                        <span>Hosted by ${escapeHtml(place.hostName)}</span>
                    </div>
                    <span class="details-button">View Details</span>
                </div>
            </a>
        `;
        grid.appendChild(article);
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
    const hostAvatar = document.getElementById("host-avatar");
    const location = document.getElementById("place-location");
    const description = document.getElementById("place-description");
    const tag = document.getElementById("place-tag");
    const amenities = document.getElementById("place-amenities");
    const image = document.getElementById("place-image");

    if (!title || !price || !host || !hostAvatar || !location || !description || !tag || !amenities || !image) {
        return;
    }

    title.textContent = place.title;
    price.textContent = `${formatPrice(place.price)} / night`;
    host.textContent = place.hostName || "HBnB Host";
    hostAvatar.src = getUserAvatar(place.host);
    hostAvatar.alt = `${place.hostName || "Host"} avatar`;
    location.textContent = place.location || "France";
    description.textContent = place.description;
    tag.textContent = place.tag || "Thoughtful stay";
    image.src = place.image;
    image.alt = `${place.title} interior`;
    image.style.objectPosition = place.imagePosition || "50% 50%";

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
                    <div class="review-user">
                        <img class="user-avatar review-avatar" src="${escapeHtml(getUserAvatar({ userName: "Guest" }))}" alt="Guest avatar">
                        <strong>No reviews yet</strong>
                    </div>
                    <span class="review-rating">Be the first</span>
                </div>
                <p>This place does not have any published review yet.</p>
            </div>
        `;
        return;
    }

    reviews.forEach((review) => {
        const reviewer = review.user || review;
        const card = document.createElement("div");
        card.className = "review-card";
        card.innerHTML = `
            <div class="review-meta">
                <div class="review-user">
                    <img class="user-avatar review-avatar" src="${escapeHtml(getUserAvatar(reviewer))}" alt="${escapeHtml(review.userName)} avatar">
                    <strong>${escapeHtml(review.userName)}</strong>
                </div>
                <span class="review-rating">${escapeHtml(String(review.rating))} / 5</span>
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
            return data.map((place, index) => normalizePlace(place, index));
        }
    } catch (error) {
        // Keep the front usable with curated fallback places.
    }

    return FALLBACK_PLACES.map((place) => normalizePlace(place));
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
                user,
                userName,
                rating: review.rating,
                text: review.text,
            };
        }));
    } catch (error) {
        return FALLBACK_REVIEWS[placeId] || [];
    }
}

function normalizePlace(place, index = 0) {
    const media = resolvePlaceMedia(place, index);
    const amenities = Array.isArray(place.amenities)
        ? place.amenities.map((item) => typeof item === "string" ? item : item.name).filter(Boolean)
        : media.amenities || [];

    const owner = place.owner || {
        id: place.owner_id || media.hostSeed,
        userName: media.hostName,
        first_name: media.hostName?.split(" ")[0] || "HBnB",
        last_name: media.hostName?.split(" ").slice(1).join(" ") || "Host",
    };

    return {
        id: place.id || media.id || `place-${index + 1}`,
        title: place.title || media.title || "Untitled stay",
        price: Number(place.price || media.price || 0),
        description: place.description || media.description || "A calm, well-balanced stay designed for simple comfort.",
        location: place.location || formatLocation(place, media.location),
        host: owner,
        hostName: getUserLabel(owner) || media.hostName || "HBnB Host",
        image: place.image || media.image,
        imagePosition: place.imagePosition || media.imagePosition || "50% 50%",
        tag: place.tag || media.tag || amenities[0] || "Curated stay",
        amenities,
    };
}

function resolvePlaceMedia(place, index = 0) {
    const exactId = place?.id && PLACE_MEDIA[place.id] ? place.id : null;
    if (exactId) {
        return { id: exactId, ...PLACE_MEDIA[exactId] };
    }

    const normalizedTitle = String(place?.title || "").trim().toLowerCase();
    const titleMatch = PLACE_MEDIA_ORDER.find((key) => PLACE_MEDIA[key].title.toLowerCase() === normalizedTitle);
    if (titleMatch) {
        return { id: titleMatch, ...PLACE_MEDIA[titleMatch] };
    }

    const fallbackKey = PLACE_MEDIA_ORDER[stableIndex(place?.id || place?.title || String(index)) % PLACE_MEDIA_ORDER.length];
    return { id: fallbackKey, ...PLACE_MEDIA[fallbackKey] };
}

function getUserAvatar(user) {
    if (user?.profile_photo_url) {
        return user.profile_photo_url;
    }

    const seed = getUserSeed(user);
    return `https://api.dicebear.com/9.x/open-peeps/svg?seed=${encodeURIComponent(seed)}`;
}

function getUserSeed(user) {
    if (!user) {
        return "hbnb-guest";
    }

    return user.id
        || user.email
        || user.userSeed
        || user.userName
        || `${user.first_name || ""}-${user.last_name || ""}`.trim()
        || "hbnb-user";
}

function getUserLabel(user) {
    if (!user) {
        return "Account";
    }

    if (user.userName) {
        return user.userName;
    }

    const firstName = user.first_name || "";
    const lastName = user.last_name || "";
    const fullName = `${firstName} ${lastName}`.trim();
    return fullName || user.email || "Account";
}

function decodeJwtPayload(token) {
    try {
        const [, payload] = token.split(".");
        const base64 = payload.replaceAll("-", "+").replaceAll("_", "/");
        const padded = `${base64}${"=".repeat((4 - (base64.length % 4)) % 4)}`;
        return JSON.parse(window.atob(padded));
    } catch (error) {
        return null;
    }
}

function formatLocation(place, fallback) {
    if (typeof place?.latitude === "number" && typeof place?.longitude === "number") {
        return `Lat ${place.latitude.toFixed(2)} · Lng ${place.longitude.toFixed(2)}`;
    }

    return fallback || "France";
}

function stableIndex(value) {
    let hash = 0;
    for (const char of String(value)) {
        hash = ((hash << 5) - hash) + char.charCodeAt(0);
        hash |= 0;
    }
    return Math.abs(hash);
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
