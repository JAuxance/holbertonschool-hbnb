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

const PHONE_COUNTRIES = [
    { iso: "AR", name: "Argentina", dialCode: "+54" },
    { iso: "AU", name: "Australia", dialCode: "+61" },
    { iso: "AT", name: "Austria", dialCode: "+43" },
    { iso: "BE", name: "Belgium", dialCode: "+32" },
    { iso: "BR", name: "Brazil", dialCode: "+55" },
    { iso: "BG", name: "Bulgaria", dialCode: "+359" },
    { iso: "CA", name: "Canada", dialCode: "+1" },
    { iso: "CL", name: "Chile", dialCode: "+56" },
    { iso: "CN", name: "China", dialCode: "+86" },
    { iso: "CO", name: "Colombia", dialCode: "+57" },
    { iso: "CR", name: "Costa Rica", dialCode: "+506" },
    { iso: "HR", name: "Croatia", dialCode: "+385" },
    { iso: "CY", name: "Cyprus", dialCode: "+357" },
    { iso: "CZ", name: "Czech Republic", dialCode: "+420" },
    { iso: "DK", name: "Denmark", dialCode: "+45" },
    { iso: "DO", name: "Dominican Republic", dialCode: "+1" },
    { iso: "EG", name: "Egypt", dialCode: "+20" },
    { iso: "EE", name: "Estonia", dialCode: "+372" },
    { iso: "FI", name: "Finland", dialCode: "+358" },
    { iso: "FR", name: "France", dialCode: "+33" },
    { iso: "DE", name: "Germany", dialCode: "+49" },
    { iso: "GH", name: "Ghana", dialCode: "+233" },
    { iso: "GR", name: "Greece", dialCode: "+30" },
    { iso: "HK", name: "Hong Kong", dialCode: "+852" },
    { iso: "HU", name: "Hungary", dialCode: "+36" },
    { iso: "IS", name: "Iceland", dialCode: "+354" },
    { iso: "IN", name: "India", dialCode: "+91" },
    { iso: "ID", name: "Indonesia", dialCode: "+62" },
    { iso: "IE", name: "Ireland", dialCode: "+353" },
    { iso: "IL", name: "Israel", dialCode: "+972" },
    { iso: "IT", name: "Italy", dialCode: "+39" },
    { iso: "JP", name: "Japan", dialCode: "+81" },
    { iso: "KE", name: "Kenya", dialCode: "+254" },
    { iso: "LV", name: "Latvia", dialCode: "+371" },
    { iso: "LB", name: "Lebanon", dialCode: "+961" },
    { iso: "LT", name: "Lithuania", dialCode: "+370" },
    { iso: "LU", name: "Luxembourg", dialCode: "+352" },
    { iso: "MY", name: "Malaysia", dialCode: "+60" },
    { iso: "MT", name: "Malta", dialCode: "+356" },
    { iso: "MX", name: "Mexico", dialCode: "+52" },
    { iso: "MA", name: "Morocco", dialCode: "+212" },
    { iso: "NL", name: "Netherlands", dialCode: "+31" },
    { iso: "NZ", name: "New Zealand", dialCode: "+64" },
    { iso: "NG", name: "Nigeria", dialCode: "+234" },
    { iso: "NO", name: "Norway", dialCode: "+47" },
    { iso: "PK", name: "Pakistan", dialCode: "+92" },
    { iso: "PA", name: "Panama", dialCode: "+507" },
    { iso: "PE", name: "Peru", dialCode: "+51" },
    { iso: "PH", name: "Philippines", dialCode: "+63" },
    { iso: "PL", name: "Poland", dialCode: "+48" },
    { iso: "PT", name: "Portugal", dialCode: "+351" },
    { iso: "PR", name: "Puerto Rico", dialCode: "+1" },
    { iso: "QA", name: "Qatar", dialCode: "+974" },
    { iso: "RO", name: "Romania", dialCode: "+40" },
    { iso: "SA", name: "Saudi Arabia", dialCode: "+966" },
    { iso: "RS", name: "Serbia", dialCode: "+381" },
    { iso: "SG", name: "Singapore", dialCode: "+65" },
    { iso: "SK", name: "Slovakia", dialCode: "+421" },
    { iso: "SI", name: "Slovenia", dialCode: "+386" },
    { iso: "ZA", name: "South Africa", dialCode: "+27" },
    { iso: "KR", name: "South Korea", dialCode: "+82" },
    { iso: "ES", name: "Spain", dialCode: "+34" },
    { iso: "SE", name: "Sweden", dialCode: "+46" },
    { iso: "CH", name: "Switzerland", dialCode: "+41" },
    { iso: "TW", name: "Taiwan", dialCode: "+886" },
    { iso: "TH", name: "Thailand", dialCode: "+66" },
    { iso: "TN", name: "Tunisia", dialCode: "+216" },
    { iso: "TR", name: "Turkey", dialCode: "+90" },
    { iso: "UA", name: "Ukraine", dialCode: "+380" },
    { iso: "AE", name: "United Arab Emirates", dialCode: "+971" },
    { iso: "GB", name: "United Kingdom", dialCode: "+44" },
    { iso: "US", name: "United States", dialCode: "+1" },
    { iso: "UY", name: "Uruguay", dialCode: "+598" },
    { iso: "VE", name: "Venezuela", dialCode: "+58" },
    { iso: "VN", name: "Vietnam", dialCode: "+84" },
];

const DEFAULT_PHONE_COUNTRY = "FR";
const DEFAULT_PHONE_RULE = {
    localDigitsMin: 8,
    localDigitsMax: 10,
    stripLeadingZero: false,
    example: "",
};
const MAX_PLACE_PHOTOS = 5;
const MAX_PLACE_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_PLACE_IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp"]);

let currentUserPromise = null;

document.addEventListener("DOMContentLoaded", () => {
    void initAuthActions();

    const page = document.body.dataset.page;

    if (page === "index") {
        void initIndexPage();
    } else if (page === "login") {
        initLoginPage();
    } else if (page === "signup") {
        void initSignupPage();
    } else if (page === "profile") {
        void initProfilePage();
    } else if (page === "settings") {
        void initSettingsPage();
    } else if (page === "place") {
        void initPlacePage();
    } else if (page === "add-review") {
        void initAddReviewPage();
    } else if (page === "add-place") {
        void initAddPlacePage();
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
    if (!user) {
        renderGuestAuth(container);
        return;
    }
    renderUserAuth(container, user);
}

function renderGuestAuth(container) {
    container.innerHTML = `
        <div class="auth-cluster auth-cluster-guest">
            <a class="utility-link" href="/signup.html">Sign up</a>
            <a href="/login.html" class="login-button" id="auth-link">Login</a>
        </div>
    `;
}

function renderUserAuth(container, user) {
    const label = escapeHtml(getUserLabel(user));
    const avatar = escapeHtml(getUserAvatar(user));

    container.innerHTML = `
        <div class="auth-cluster">
            <div class="auth-shortcuts">
                <a class="utility-link" href="/add_place.html">New Place</a>
            </div>
            <div class="profile-menu" data-profile-menu>
                <button
                    type="button"
                    class="profile-chip profile-chip-button"
                    aria-label="Open account menu"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    data-profile-toggle
                >
                    <img class="user-avatar" src="${avatar}" alt="${label} avatar">
                    <span class="profile-meta">
                        <span class="profile-label">Connected</span>
                        <span class="profile-name">${label}</span>
                    </span>
                    <span class="profile-caret" aria-hidden="true">▾</span>
                </button>
                <div class="profile-dropdown" role="menu" data-profile-dropdown>
                    <a class="profile-menu-item" href="/profile.html" role="menuitem">Profile</a>
                    <a class="profile-menu-item" href="/settings.html" role="menuitem">Settings</a>
                    <button type="button" class="profile-menu-item profile-menu-item-danger" role="menuitem" data-logout-action>Logout</button>
                </div>
            </div>
        </div>
    `;

    initProfileMenu(container);
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
        const isAdmin = Boolean(payload?.is_admin);

        if (!userId) {
            return { id: "account", userName: "Account", is_admin: isAdmin };
        }

        try {
            const user = await fetchJson("/api/v1/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return { ...user, is_admin: isAdmin };
        } catch (error) {
            return null;
        }
    })();

    return currentUserPromise;
}

function cacheCurrentUser(user) {
    const claims = decodeJwtPayload(getToken());
    currentUserPromise = Promise.resolve({
        ...user,
        is_admin: Boolean(claims?.is_admin ?? user?.is_admin),
    });
}

function initProfileMenu(container) {
    const menu = container.querySelector("[data-profile-menu]");
    const toggle = container.querySelector("[data-profile-toggle]");
    const dropdown = container.querySelector("[data-profile-dropdown]");
    const logoutAction = container.querySelector("[data-logout-action]");

    if (!menu || !toggle || !dropdown || !logoutAction) {
        return;
    }

    const closeMenu = () => {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
    };

    const openMenu = () => {
        menu.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
    };

    toggle.addEventListener("click", () => {
        if (menu.classList.contains("is-open")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    toggle.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            openMenu();
            const firstItem = dropdown.querySelector(".profile-menu-item");
            firstItem?.focus();
        }
    });

    dropdown.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
            toggle.focus();
        }
    });

    document.addEventListener("click", (event) => {
        if (!menu.contains(event.target)) {
            closeMenu();
        }
    });

    logoutAction.addEventListener("click", () => {
        clearToken();
        window.location.href = "/index.html";
    });
}

function initLoginPage() {
    const form = document.getElementById("login-form");
    const message = document.getElementById("login-message");
    if (!form || !message) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    if (params.get("registered") === "1") {
        message.textContent = "Account created. You can sign in now.";
    } else if (params.get("session") === "expired") {
        message.textContent = "Your session expired. Please sign in again.";
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
        grid.appendChild(createPlaceCardElement(place));
    });
}

async function initPlacePage() {
    const place = await resolvePlaceFromQuery();
    renderPlace(place);
    await renderReviews(place.id);
    updateReviewAction(place.id);
    await renderPlaceManagement(place);
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

    const places = await loadApiPlaces();
    const requestedPlaceId = new URLSearchParams(window.location.search).get("place_id");
    const selectedPlace = places.find((place) => place.id === requestedPlaceId);

    select.innerHTML = "";
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Choose a place";
    placeholder.selected = !selectedPlace;
    select.appendChild(placeholder);

    places.forEach((place) => {
        const option = document.createElement("option");
        option.value = place.id;
        option.textContent = `${place.title} · ${formatPrice(place.price)} / night`;
        if (selectedPlace && requestedPlaceId === place.id) {
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

    if (!places.length) {
        authRequired.classList.remove("hidden");
        authRequired.textContent = "No real places are available to review yet. The curated home-page cards are front-end demo previews only.";
        form.classList.add("hidden");
        return;
    }

    if (requestedPlaceId && !selectedPlace) {
        authRequired.classList.remove("hidden");
        authRequired.textContent = "This selected place is only a front-end demo preview. Choose a real place from the list to publish a review.";
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

async function initAddPlacePage() {
    const token = getToken();
    const form = document.getElementById("place-form");
    const message = document.getElementById("place-message");
    const authRequired = document.getElementById("place-auth-required");
    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const titleError = document.getElementById("title-error");
    const priceInput = document.getElementById("price");
    const priceError = document.getElementById("price-error");
    const phoneInput = document.getElementById("phone_number");
    const phoneCountrySelect = document.getElementById("phone_country");
    const phoneCountryCode = document.getElementById("phone_country_code");
    const phoneLocalNumberInput = document.getElementById("phone_local_number");
    const phoneHelp = document.getElementById("phone-help");
    const phoneError = document.getElementById("phone-error");
    const amenitiesPicker = document.getElementById("amenities-picker");
    const amenitiesHelp = document.getElementById("amenities-help");
    const amenityNameInput = document.getElementById("amenity-name-input");
    const amenityCreateButton = document.getElementById("amenity-create-button");
    const amenityCreateFeedback = document.getElementById("amenity-create-feedback");
    const latitudeInput = document.getElementById("latitude");
    const longitudeInput = document.getElementById("longitude");
    const manualLatitudeInput = document.getElementById("manual-latitude");
    const manualLongitudeInput = document.getElementById("manual-longitude");
    const manualCoordinates = document.getElementById("manual-coordinates");
    const toggleManualCoordinates = document.getElementById("toggle-manual-coordinates");
    const selectedCoordinates = document.getElementById("selected-coordinates");
    const locationError = document.getElementById("location-error");
    const mapStatus = document.getElementById("map-status");
    const imageInput = document.getElementById("place-images");
    const photosError = document.getElementById("photos-error");
    const imagePreview = document.getElementById("place-images-preview");
    const addressInput = document.getElementById("place-address");
    const searchAddressButton = document.getElementById("search-address-button");
    const addressSearchStatus = document.getElementById("address-search-status");
    const addressSearchResults = document.getElementById("address-search-results");
    const submitButton = document.getElementById("create-place-submit");
    const mapCard = form?.querySelector(".map-card");

    if (
        !form || !message || !authRequired || !titleInput || !descriptionInput || !priceInput
        || !titleError || !priceError || !phoneInput || !phoneCountrySelect
        || !phoneCountryCode || !phoneLocalNumberInput || !phoneHelp || !phoneError
        || !amenitiesPicker || !amenitiesHelp
        || !amenityNameInput || !amenityCreateButton || !amenityCreateFeedback
        || !latitudeInput || !longitudeInput || !manualLatitudeInput || !manualLongitudeInput
        || !manualCoordinates || !toggleManualCoordinates || !selectedCoordinates || !locationError || !mapStatus
        || !imageInput || !photosError || !imagePreview
        || !addressInput || !searchAddressButton || !addressSearchStatus || !addressSearchResults
        || !submitButton || !mapCard
    ) {
        return;
    }

    if (!token) {
        authRequired.classList.remove("hidden");
        authRequired.innerHTML = buildGuestAccessBanner(
            "You need an account before creating a place.",
            window.location.pathname,
        );
        form.classList.add("hidden");
        return;
    }

    try {
        let isSubmitting = false;
        const fieldBindings = {
            title: {
                label: "Title",
                errorElement: titleError,
                inputs: [titleInput],
                focusTarget: titleInput,
            },
            price: {
                label: "Price",
                errorElement: priceError,
                inputs: [priceInput],
                focusTarget: priceInput,
            },
            phone_number: {
                label: "Phone number",
                errorElement: phoneError,
                inputs: [phoneCountrySelect, phoneLocalNumberInput],
                focusTarget: phoneLocalNumberInput,
            },
            photos: {
                label: "Photos",
                errorElement: photosError,
                inputs: [imageInput],
                focusTarget: imageInput,
            },
            location: {
                label: "Map location",
                errorElement: locationError,
                inputs: [manualLatitudeInput, manualLongitudeInput],
                focusTarget: toggleManualCoordinates,
                container: mapCard,
            },
        };

        const phoneController = initInternationalPhoneInput({
            hiddenInput: phoneInput,
            countrySelect: phoneCountrySelect,
            dialCodeBadge: phoneCountryCode,
            localNumberInput: phoneLocalNumberInput,
            helperText: phoneHelp,
            countries: getPhoneCountriesCatalog(),
            defaultCountryIso: getDefaultPhoneCountryIso(),
        });

        const amenityPickerController = createAmenityPicker({
            container: amenitiesPicker,
            helper: amenitiesHelp,
            createInput: amenityNameInput,
            createButton: amenityCreateButton,
            createFeedback: amenityCreateFeedback,
            token,
        });
        await amenityPickerController.load();

        const mapController = initPlaceLocationPicker({
            latitudeInput,
            longitudeInput,
            manualLatitudeInput,
            manualLongitudeInput,
            manualCoordinates,
            toggleManualCoordinates,
            selectedCoordinates,
            mapStatus,
        });

        const photoUploader = createPhotoUploader({
            input: imageInput,
            previewContainer: imagePreview,
        });

        searchAddressButton.addEventListener("click", async () => {
            const query = addressInput.value.trim();
            addressSearchResults.innerHTML = "";

            if (!query) {
                addressSearchStatus.textContent = "Enter an address before searching.";
                addressSearchResults.classList.add("hidden");
                return;
            }

            addressSearchStatus.textContent = "Searching address...";

            try {
                const results = await searchAddress(query);
                if (!results.length) {
                    addressSearchStatus.textContent = "No address found. Try a more precise query or place the point manually.";
                    addressSearchResults.classList.add("hidden");
                    return;
                }

                addressSearchResults.classList.remove("hidden");
                addressSearchStatus.textContent = "Choose the result that matches your place.";

                results.forEach((result) => {
                    const button = document.createElement("button");
                    button.type = "button";
                    button.className = "address-result";
                    button.textContent = result.display_name;
                    button.addEventListener("click", () => {
                        mapController.setCoordinates(Number(result.lat), Number(result.lon), {
                            centerMap: true,
                        });
                        addressInput.value = result.display_name;
                        addressSearchResults.classList.add("hidden");
                        addressSearchResults.innerHTML = "";
                        addressSearchStatus.textContent = "Address selected. You can still adjust the point on the map.";
                    });
                    addressSearchResults.appendChild(button);
                });
            } catch (error) {
                addressSearchStatus.textContent = "Address search is unavailable right now. You can still use the map or manual coordinates.";
                addressSearchResults.classList.add("hidden");
            }
        });

        addressInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                searchAddressButton.click();
            }
        });

        priceInput.addEventListener("input", () => {
            priceInput.value = sanitizeDigits(priceInput.value).slice(0, 7);
            clearPlaceFieldError(fieldBindings, "price");
        });

        phoneLocalNumberInput.addEventListener("input", () => {
            phoneController.sync();
            clearPlaceFieldError(fieldBindings, "phone_number");
        });

        phoneCountrySelect.addEventListener("change", () => {
            phoneController.sync();
            clearPlaceFieldError(fieldBindings, "phone_number");
        });

        titleInput.addEventListener("input", () => {
            clearPlaceFieldError(fieldBindings, "title");
        });

        imageInput.addEventListener("change", () => {
            clearPlaceFieldError(fieldBindings, "photos");
        });

        manualLatitudeInput.addEventListener("input", () => {
            clearPlaceFieldError(fieldBindings, "location");
        });

        manualLongitudeInput.addEventListener("input", () => {
            clearPlaceFieldError(fieldBindings, "location");
        });

        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            if (isSubmitting) {
                return;
            }

            clearFormMessage(message);
            clearPlaceFieldErrors(fieldBindings);

            const validation = validatePlaceForm({
                titleInput,
                priceInput,
                latitudeInput,
                longitudeInput,
                phoneController,
                phoneLocalNumberInput,
                imageFiles: photoUploader.getFiles(),
            });

            if (!validation.isValid) {
                if (validation.fields.location) {
                    mapController.showManualMode();
                }
                applyPlaceFieldErrors(message, fieldBindings, validation.fields, { scroll: true });
                return;
            }

            try {
                isSubmitting = true;
                setFormMessage(message, "Creating your place...", "info", { scroll: true });
                submitButton.disabled = true;
                submitButton.textContent = "Creating...";

                const formData = new FormData();
                formData.append("title", validation.values.title);
                formData.append("description", descriptionInput.value.trim());
                formData.append("price", String(validation.values.price));
                formData.append("latitude", String(validation.values.latitude));
                formData.append("longitude", String(validation.values.longitude));
                if (validation.values.phoneNumber) {
                    formData.append("phone_number", validation.values.phoneNumber);
                    formData.append("phone_country_iso", validation.values.phoneCountryIso);
                }
                amenityPickerController.getSelectedIds().forEach((amenityId) => {
                    formData.append("amenities", amenityId);
                });
                validation.values.photos.forEach((file) => {
                    formData.append("images", file, file.name);
                });

                const data = await fetchJson("/api/v1/places/", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });

                setFormMessage(message, "Place created. Redirecting to the detail page...", "success", { scroll: true });
                window.setTimeout(() => {
                    window.location.href = `/place.html?id=${encodeURIComponent(data.id)}`;
                }, 700);
            } catch (error) {
                console.error("Create Place submit failed:", error);
                if (error.fields && Object.keys(error.fields).length) {
                    applyPlaceFieldErrors(message, fieldBindings, error.fields, {
                        scroll: true,
                        fallbackMessage: error.message || "Validation failed.",
                    });
                } else {
                    setFormMessage(message, error.message || "Unable to create this place right now.", "error", { scroll: true });
                }
            } finally {
                isSubmitting = false;
                submitButton.disabled = false;
                submitButton.textContent = "Create Place";
            }
        });
    } catch (error) {
        console.error("Create Place page init failed:", error);
        submitButton.disabled = true;
        setFormMessage(
            message,
            "This form could not initialize correctly. Refresh the page and try again.",
            "error",
            { scroll: true },
        );
    }
}

function setFormMessage(element, text, tone = "info", { scroll = false } = {}) {
    if (!element) {
        return;
    }

    element.textContent = text || "";
    element.classList.remove("is-info", "is-error", "is-success", "is-visible");

    if (!text) {
        return;
    }

    element.classList.add("is-visible", `is-${tone}`);

    if (scroll) {
        element.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    }
}

function clearFormMessage(element) {
    setFormMessage(element, "");
}

function sanitizeDigits(value) {
    return String(value || "").replace(/\D/g, "");
}

function formatPhoneLocalDisplay(digits) {
    const cleanDigits = sanitizeDigits(digits);
    if (!cleanDigits) {
        return "";
    }

    return cleanDigits.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
}

async function initSignupPage() {
    const token = getToken();
    const form = document.getElementById("signup-form");
    const message = document.getElementById("signup-message");
    const authRequired = document.getElementById("signup-auth-required");

    if (!form || !message || !authRequired) {
        return;
    }

    if (token) {
        authRequired.classList.remove("hidden");
        authRequired.innerHTML = `
            <strong>You are already signed in.</strong>
            <div class="banner-actions">
                <a class="utility-link" href="/index.html">Browse places</a>
                <a class="login-button" href="/add_place.html">Create a place</a>
            </div>
        `;
        form.classList.add("hidden");
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        message.textContent = "Creating your account...";

        try {
            await fetchJson("/api/v1/auth/signup", {
                method: "POST",
                body: JSON.stringify({
                    first_name: form.first_name.value.trim(),
                    last_name: form.last_name.value.trim(),
                    email: form.email.value.trim(),
                    password: form.password.value,
                }),
            });

            message.textContent = "Account created. Redirecting to login...";
            const currentUrl = new URL(window.location.href);
            const next = currentUrl.searchParams.get("next");
            const loginUrl = new URL("/login.html", window.location.origin);
            loginUrl.searchParams.set("registered", "1");
            if (next) {
                loginUrl.searchParams.set("next", next);
            }

            window.setTimeout(() => {
                window.location.href = loginUrl.toString();
            }, 700);
        } catch (error) {
            message.textContent = error.message || "Unable to create your account right now.";
        }
    });
}

async function initProfilePage() {
    const authRequired = document.getElementById("profile-auth-required");
    const content = document.getElementById("profile-content");
    const name = document.getElementById("profile-name");
    const email = document.getElementById("profile-email");
    const avatar = document.getElementById("profile-avatar");
    const placeCount = document.getElementById("profile-place-count");
    const role = document.getElementById("profile-role");
    const placesGrid = document.getElementById("profile-places-grid");
    const emptyState = document.getElementById("profile-empty-state");
    const feedback = document.getElementById("profile-places-message");

    if (!authRequired || !content || !name || !email || !avatar || !placeCount || !role || !placesGrid || !emptyState || !feedback) {
        return;
    }

    const token = getToken();
    if (!token) {
        authRequired.classList.remove("hidden");
        authRequired.innerHTML = buildGuestAccessBanner(
            "You need an account to view your profile.",
            window.location.pathname,
        );
        return;
    }

    try {
        const user = await loadCurrentUser();
        if (!user) {
            return;
        }
        const places = await loadCurrentUserPlaces();

        name.textContent = getUserLabel(user);
        email.textContent = user.email || "No email available";
        avatar.src = getUserAvatar(user);
        avatar.alt = `${getUserLabel(user)} avatar`;
        placeCount.textContent = String(places.length);
        role.textContent = user.is_admin ? "Admin" : "Member";

        placesGrid.innerHTML = "";
        const refreshOwnedPlacesState = () => {
            const cards = placesGrid.querySelectorAll(".place-card");
            placeCount.textContent = String(cards.length);

            if (cards.length) {
                emptyState.classList.add("hidden");
            } else {
                emptyState.classList.remove("hidden");
                emptyState.innerHTML = `
                    <strong>No published places yet.</strong>
                    <div class="banner-actions">
                        <a class="login-button" href="/add_place.html">Create your first place</a>
                    </div>
                `;
            }
        };

        if (places.length) {
            places.forEach((place) => {
                const normalizedPlace = normalizePlace({ ...place, owner: user });
                const card = createPlaceCardElement(normalizedPlace, { showDeleteAction: true });
                const deleteButton = card.querySelector("[data-delete-place-card]");
                deleteButton?.addEventListener("click", async () => {
                    feedback.textContent = "";
                    const deleted = await deletePlaceWithConfirmation(normalizedPlace.id, {
                        onDeleting: () => {
                            feedback.textContent = "Deleting this place...";
                            deleteButton.disabled = true;
                        },
                        onSuccess: () => {
                            card.remove();
                            refreshOwnedPlacesState();
                            feedback.textContent = "Place deleted.";
                        },
                        onError: (error) => {
                            deleteButton.disabled = false;
                            feedback.textContent = error.message || "Unable to delete this place right now.";
                        },
                    });
                    if (!deleted) {
                        deleteButton.disabled = false;
                    }
                });
                placesGrid.appendChild(card);
            });
            emptyState.classList.add("hidden");
        } else {
            emptyState.classList.remove("hidden");
            emptyState.innerHTML = `
                <strong>No published places yet.</strong>
                <div class="banner-actions">
                    <a class="login-button" href="/add_place.html">Create your first place</a>
                </div>
            `;
        }

        refreshOwnedPlacesState();
        content.classList.remove("hidden");
    } catch (error) {
        authRequired.classList.remove("hidden");
        authRequired.textContent = error.message || "Unable to load your profile right now.";
    }
}

async function initSettingsPage() {
    const token = getToken();
    const authRequired = document.getElementById("settings-auth-required");
    const settingsCard = document.getElementById("settings-card");
    const form = document.getElementById("settings-form");
    const message = document.getElementById("settings-message");
    const firstName = document.getElementById("settings-first-name");
    const lastName = document.getElementById("settings-last-name");

    if (!authRequired || !settingsCard || !form || !message || !firstName || !lastName) {
        return;
    }

    if (!token) {
        authRequired.classList.remove("hidden");
        authRequired.innerHTML = buildGuestAccessBanner(
            "You need an account to edit your settings.",
            window.location.pathname,
        );
        return;
    }

    try {
        const user = await loadCurrentUser();
        if (!user) {
            return;
        }
        firstName.value = user.first_name || "";
        lastName.value = user.last_name || "";
        settingsCard.classList.remove("hidden");
    } catch (error) {
        authRequired.classList.remove("hidden");
        authRequired.textContent = error.message || "Unable to load your settings.";
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        message.textContent = "Saving your changes...";

        try {
            const updatedUser = await fetchJson("/api/v1/users/me", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    first_name: firstName.value.trim(),
                    last_name: lastName.value.trim(),
                }),
            });

            cacheCurrentUser(updatedUser);
            syncVisibleAccountName(updatedUser);
            message.textContent = "Profile updated successfully.";
        } catch (error) {
            message.textContent = error.message || "Unable to save your settings right now.";
        }
    });
}

function getEmbeddedJson(id, fallback = null) {
    const element = document.getElementById(id);
    if (!element) {
        return fallback;
    }

    try {
        return JSON.parse(element.textContent);
    } catch (error) {
        return fallback;
    }
}

function getPhoneCountriesCatalog() {
    const rawCatalog = getEmbeddedJson("phone-country-catalog", PHONE_COUNTRIES);
    if (!Array.isArray(rawCatalog)) {
        return [];
    }

    return rawCatalog.map((country) => ({
        ...DEFAULT_PHONE_RULE,
        ...country,
    }));
}

function getDefaultPhoneCountryIso() {
    return getEmbeddedJson("default-phone-country", DEFAULT_PHONE_COUNTRY) || DEFAULT_PHONE_COUNTRY;
}

function getPhoneCountryByIso(countries, iso) {
    return countries.find((country) => country.iso === iso) || null;
}

function buildPhoneHelperText(country) {
    if (!country) {
        return "Choose the country first. We store one international number starting with the correct + code.";
    }

    const digitRule = country.localDigitsMin === country.localDigitsMax
        ? `${country.localDigitsMin} local digits`
        : `${country.localDigitsMin} to ${country.localDigitsMax} local digits`;
    const example = country.example ? ` Example: ${country.example}.` : "";
    const leadingZeroRule = country.stripLeadingZero
        ? "You can type the local leading 0, it will be removed automatically in the saved international number."
        : "The saved international number keeps the selected country code.";

    return `${country.name} numbers should contain ${digitRule} after ${country.dialCode}.${example} ${leadingZeroRule}`.trim();
}

function validateLocalPhoneNumber(country, rawValue) {
    const inputDigits = sanitizeDigits(rawValue);
    const maxInputDigits = country.localDigitsMax + (country.stripLeadingZero ? 1 : 0);
    const trimmedDigits = country?.stripLeadingZero
        ? inputDigits.replace(/^0+/, "")
        : inputDigits;
    const localDigits = trimmedDigits.slice(0, country.localDigitsMax);
    const normalized = localDigits ? `${country.dialCode}${localDigits}` : "";

    if (!inputDigits) {
        return {
            valid: true,
            normalized: "",
            displayValue: "",
            localDigits,
            message: "",
        };
    }

    if (country.stripLeadingZero && !inputDigits.startsWith("0") && inputDigits.length === country.localDigitsMax) {
        return {
            valid: true,
            normalized,
            displayValue: formatPhoneLocalDisplay(inputDigits.slice(0, country.localDigitsMax)),
            localDigits,
            message: "",
        };
    }

    if (inputDigits.length > maxInputDigits) {
        return {
            valid: false,
            normalized: "",
            displayValue: formatPhoneLocalDisplay(inputDigits.slice(0, maxInputDigits)),
            localDigits,
            message: `Phone number for ${country.name} is too long.`,
        };
    }

    if (localDigits.length < country.localDigitsMin || localDigits.length > country.localDigitsMax) {
        const digitRule = country.localDigitsMin === country.localDigitsMax
            ? `${country.localDigitsMin} local digits`
            : `${country.localDigitsMin} to ${country.localDigitsMax} local digits`;
        return {
            valid: false,
            normalized: "",
            displayValue: formatPhoneLocalDisplay(inputDigits.slice(0, country.localDigitsMax + (country.stripLeadingZero ? 1 : 0))),
            localDigits,
            message: `Phone number for ${country.name} must contain ${digitRule}.`,
        };
    }

    return {
        valid: true,
        normalized,
        displayValue: formatPhoneLocalDisplay(inputDigits.slice(0, country.localDigitsMax + (country.stripLeadingZero ? 1 : 0))),
        localDigits,
        message: "",
    };
}

function initInternationalPhoneInput({
    hiddenInput,
    countrySelect,
    dialCodeBadge,
    localNumberInput,
    helperText,
    countries,
    defaultCountryIso,
}) {
    const sortedCountries = [...countries].sort((left, right) => left.name.localeCompare(right.name));
    countrySelect.innerHTML = "";

    sortedCountries.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.iso;
        option.textContent = country.name;
        if (country.iso === defaultCountryIso) {
            option.selected = true;
        }
        countrySelect.appendChild(option);
    });

    const getSelectedCountry = () => {
        return getPhoneCountryByIso(sortedCountries, countrySelect.value)
            || getPhoneCountryByIso(sortedCountries, defaultCountryIso)
            || sortedCountries[0]
            || {
                iso: DEFAULT_PHONE_COUNTRY,
                name: "Selected country",
                dialCode: "+",
                ...DEFAULT_PHONE_RULE,
            };
    };

    const syncPhoneNumber = () => {
        const country = getSelectedCountry();
        const validation = validateLocalPhoneNumber(country, localNumberInput.value);
        const inputMaxDigits = country.localDigitsMax + (country.stripLeadingZero ? 1 : 0);

        dialCodeBadge.textContent = country.dialCode;
        localNumberInput.value = validation.displayValue;
        localNumberInput.maxLength = inputMaxDigits + Math.floor(inputMaxDigits / 2);
        hiddenInput.value = validation.valid ? validation.normalized : "";
        helperText.textContent = buildPhoneHelperText(country);
        return {
            ...validation,
            country,
        };
    };

    countrySelect.addEventListener("change", syncPhoneNumber);
    localNumberInput.addEventListener("input", syncPhoneNumber);
    syncPhoneNumber();

    return {
        getValue() {
            return syncPhoneNumber().normalized || null;
        },
        getValidation() {
            return syncPhoneNumber();
        },
        getSelectedCountry() {
            return getSelectedCountry();
        },
        sync: syncPhoneNumber,
    };
}

function createPhotoUploader({ input, previewContainer }) {
    let selectedFiles = [];
    let previewUrls = [];

    const revokePreviews = () => {
        previewUrls.forEach((url) => URL.revokeObjectURL(url));
        previewUrls = [];
    };

    const syncInputFiles = () => {
        const dataTransfer = new DataTransfer();
        selectedFiles.forEach((file) => dataTransfer.items.add(file));
        input.files = dataTransfer.files;
    };

    const render = () => {
        revokePreviews();
        previewContainer.innerHTML = "";

        if (!selectedFiles.length) {
            previewContainer.classList.add("hidden");
            return;
        }

        previewContainer.classList.remove("hidden");
        selectedFiles.forEach((file, index) => {
            const previewUrl = URL.createObjectURL(file);
            previewUrls.push(previewUrl);

            const article = document.createElement("article");
            article.className = "image-preview-card";
            article.innerHTML = `
                <img src="${escapeHtml(previewUrl)}" alt="${escapeHtml(file.name)} preview">
                <div class="image-preview-meta">
                    <strong>Photo ${index + 1}</strong>
                    <span>${escapeHtml(file.name)}</span>
                    <button type="button" class="image-preview-remove" data-photo-index="${index}">Remove</button>
                </div>
            `;
            previewContainer.appendChild(article);
        });

        previewContainer.querySelectorAll("[data-photo-index]").forEach((button) => {
            button.addEventListener("click", () => {
                const index = Number(button.dataset.photoIndex);
                selectedFiles = selectedFiles.filter((_, fileIndex) => fileIndex !== index);
                syncInputFiles();
                render();
            });
        });
    };

    input.addEventListener("change", () => {
        const nextFiles = Array.from(input.files || []);
        if (!nextFiles.length) {
            syncInputFiles();
            render();
            return;
        }
        selectedFiles = [...selectedFiles, ...nextFiles];
        syncInputFiles();
        render();
    });

    return {
        getFiles() {
            return [...selectedFiles];
        },
    };
}

function validateSelectedPlacePhotos(files) {
    if (!files.length) {
        return "";
    }
    if (files.length > MAX_PLACE_PHOTOS) {
        return `Add up to ${MAX_PLACE_PHOTOS} photos per place.`;
    }

    for (const file of files) {
        const extension = String(file.name || "").split(".").pop()?.toLowerCase() || "";
        if (!ALLOWED_PLACE_IMAGE_EXTENSIONS.has(extension)) {
            return "Photos must use JPG, JPEG, PNG, or WEBP.";
        }
        if (Number(file.size || 0) > MAX_PLACE_IMAGE_SIZE) {
            return "Each photo must be 5 MB or smaller.";
        }
    }

    return "";
}

function normalizePlaceFieldKey(fieldName) {
    if (fieldName === "latitude" || fieldName === "longitude") {
        return "location";
    }
    if (fieldName === "phone_country_iso") {
        return "phone_number";
    }
    return fieldName;
}

function clearPlaceFieldError(fieldBindings, fieldName) {
    const binding = fieldBindings[normalizePlaceFieldKey(fieldName)];
    if (!binding) {
        return;
    }
    if (binding.errorElement) {
        binding.errorElement.textContent = "";
    }
    binding.inputs?.forEach((input) => {
        input?.setAttribute("aria-invalid", "false");
    });
    binding.container?.classList.remove("is-invalid");
}

function clearPlaceFieldErrors(fieldBindings) {
    Object.keys(fieldBindings).forEach((fieldName) => {
        clearPlaceFieldError(fieldBindings, fieldName);
    });
}

function applyPlaceFieldErrors(summaryElement, fieldBindings, rawFields, { scroll = false, fallbackMessage = null } = {}) {
    clearPlaceFieldErrors(fieldBindings);

    const labels = [];
    let firstFocusTarget = null;
    const normalizedEntries = Object.entries(rawFields || {}).map(([fieldName, errorMessage]) => [
        normalizePlaceFieldKey(fieldName),
        errorMessage,
    ]);

    normalizedEntries.forEach(([fieldName, errorMessage]) => {
        const binding = fieldBindings[fieldName];
        if (!binding || !errorMessage) {
            return;
        }
        binding.errorElement.textContent = errorMessage;
        binding.inputs?.forEach((input) => {
            input?.setAttribute("aria-invalid", "true");
        });
        binding.container?.classList.add("is-invalid");
        labels.push(binding.label);
        if (!firstFocusTarget) {
            firstFocusTarget = binding.focusTarget || binding.inputs?.[0] || null;
        }
    });

    const uniqueLabels = Array.from(new Set(labels));
    if (uniqueLabels.length) {
        setFormMessage(
            summaryElement,
            `Fix these fields before creating the place: ${uniqueLabels.join(", ")}.`,
            "error",
            { scroll },
        );
    } else if (fallbackMessage) {
        setFormMessage(summaryElement, fallbackMessage, "error", { scroll });
    }

    firstFocusTarget?.focus?.();
}

function validatePlaceForm({
    titleInput,
    priceInput,
    latitudeInput,
    longitudeInput,
    phoneController,
    phoneLocalNumberInput,
    imageFiles,
}) {
    const fields = {};
    const title = titleInput.value.trim();
    const rawPriceValue = String(priceInput.value || "").trim();
    const rawPriceDigits = sanitizeDigits(rawPriceValue);
    const latitude = Number(latitudeInput.value);
    const longitude = Number(longitudeInput.value);
    const phoneValidation = phoneController.getValidation();
    const photosError = validateSelectedPlacePhotos(imageFiles);

    if (!title) {
        fields.title = "Title is required.";
    } else if (title.length > 100) {
        fields.title = "Title must stay within 100 characters.";
    }

    if (!rawPriceValue) {
        fields.price = "Price is required.";
    } else if (rawPriceValue !== rawPriceDigits) {
        fields.price = "Price must use digits only, up to 7 numbers.";
    } else if (!rawPriceDigits || rawPriceDigits.length > 7) {
        fields.price = "Price must use digits only, up to 7 numbers.";
    }

    if (!isValidLatitude(latitude) || !isValidLongitude(longitude)) {
        fields.location = "Choose a point on the map or enter valid coordinates before creating the place.";
    }

    if (phoneLocalNumberInput.value.trim() && !phoneValidation.valid) {
        fields.phone_number = phoneValidation.message || "Enter a valid phone number for the selected country.";
    }

    if (photosError) {
        fields.photos = photosError;
    }

    return {
        isValid: !Object.keys(fields).length,
        fields,
        values: {
            title,
            price: Number(rawPriceDigits),
            latitude,
            longitude,
            phoneNumber: phoneValidation.valid ? (phoneValidation.normalized || null) : null,
            phoneCountryIso: phoneValidation.valid && phoneValidation.normalized ? phoneValidation.country.iso : null,
            photos: imageFiles,
        },
    };
}

function createAmenityPicker({ container, helper, createInput, createButton, createFeedback, token }) {
    const amenities = [];
    const selectedIds = new Set();

    const sortAmenities = () => {
        amenities.sort((left, right) => left.name.localeCompare(right.name));
    };

    const render = () => {
        container.innerHTML = "";
        sortAmenities();

        if (!amenities.length) {
            container.innerHTML = '<p class="amenity-picker-empty">No amenities yet. Add the first one above.</p>';
            return;
        }

        amenities.forEach((amenity) => {
            const label = document.createElement("label");
            label.className = "amenity-option";
            label.innerHTML = `
                <input type="checkbox" name="amenities" value="${escapeHtml(amenity.id)}" ${selectedIds.has(amenity.id) ? "checked" : ""}>
                <span>${escapeHtml(amenity.name)}</span>
            `;
            label.querySelector("input")?.addEventListener("change", (event) => {
                if (event.target.checked) {
                    selectedIds.add(amenity.id);
                } else {
                    selectedIds.delete(amenity.id);
                }
            });
            container.appendChild(label);
        });
    };

    const upsertAmenity = (amenity, { select = false } = {}) => {
        if (!amenity?.id || !amenity?.name) {
            return;
        }

        const existing = amenities.find((item) => item.id === amenity.id);
        if (existing) {
            existing.name = amenity.name;
        } else {
            amenities.push({ id: amenity.id, name: amenity.name });
        }

        if (select) {
            selectedIds.add(amenity.id);
        }

        render();
    };

    const createAmenity = async () => {
        const name = createInput.value.trim();
        if (!name) {
            createFeedback.textContent = "Enter an amenity name before adding it.";
            createInput.focus();
            return;
        }

        try {
            createButton.disabled = true;
            createFeedback.textContent = "Adding amenity...";
            const amenity = await fetchJson("/api/v1/amenities/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name }),
            });

            upsertAmenity(amenity, { select: true });
            createInput.value = "";
            createFeedback.textContent = "Amenity ready and selected for this place.";
            helper.textContent = "Choose existing amenities or add a new one to the global catalog for future filtering.";
            createInput.focus();
        } catch (error) {
            createFeedback.textContent = error.message || "Unable to add this amenity right now.";
        } finally {
            createButton.disabled = false;
        }
    };

    createButton.addEventListener("click", () => {
        void createAmenity();
    });

    createInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            void createAmenity();
        }
    });

    return {
        async load() {
            container.innerHTML = "";
            helper.textContent = "Loading available amenities...";
            createFeedback.textContent = "";

            try {
                const data = await fetchJson("/api/v1/amenities/");
                const payload = Array.isArray(data?.amenities) ? data.amenities : [];

                amenities.splice(0, amenities.length, ...payload.map((amenity) => ({
                    id: amenity.id,
                    name: amenity.name,
                })));

                helper.textContent = amenities.length
                    ? "Choose existing amenities or add a new one to the global catalog for future filtering."
                    : "No amenities are in the catalog yet. Add the first one below.";
            } catch (error) {
                helper.textContent = "Unable to load current amenities. You can still add a new one below.";
                amenities.splice(0, amenities.length);
            }

            render();
        },
        getSelectedIds() {
            return Array.from(selectedIds);
        },
    };
}

function initPlaceLocationPicker({
    latitudeInput,
    longitudeInput,
    manualLatitudeInput,
    manualLongitudeInput,
    manualCoordinates,
    toggleManualCoordinates,
    selectedCoordinates,
    mapStatus,
}) {
    const mapElement = document.getElementById("place-map");
    const defaultCoords = [46.603354, 1.888334];
    let map = null;
    let marker = null;

    const updateSelectedCoordinates = (latitude, longitude) => {
        if (isValidLatitude(latitude) && isValidLongitude(longitude)) {
            selectedCoordinates.textContent = `Selected: ${Number(latitude).toFixed(4)}, ${Number(longitude).toFixed(4)}`;
        } else {
            selectedCoordinates.textContent = "No location selected yet.";
        }
    };

    const syncCoordinates = (latitude, longitude, { centerMap = false } = {}) => {
        latitudeInput.value = latitude;
        longitudeInput.value = longitude;
        manualLatitudeInput.value = latitude;
        manualLongitudeInput.value = longitude;
        updateSelectedCoordinates(latitude, longitude);

        if (map && window.L && isValidLatitude(latitude) && isValidLongitude(longitude)) {
            const latLng = [Number(latitude), Number(longitude)];
            if (!marker) {
                marker = window.L.marker(latLng, { draggable: true }).addTo(map);
                marker.on("dragend", () => {
                    const nextLatLng = marker.getLatLng();
                    syncCoordinates(nextLatLng.lat, nextLatLng.lng);
                });
            } else {
                marker.setLatLng(latLng);
            }

            if (centerMap) {
                map.setView(latLng, Math.max(map.getZoom(), 9));
            }
        }
    };

    const showManualMode = (forceOpen = null) => {
        const shouldOpen = forceOpen ?? manualCoordinates.classList.contains("hidden");
        manualCoordinates.classList.toggle("hidden", !shouldOpen);
        toggleManualCoordinates.textContent = shouldOpen
            ? "Hide manual coordinates"
            : "Enter coordinates manually";
    };

    toggleManualCoordinates.addEventListener("click", () => {
        showManualMode();
    });

    const syncFromManualInputs = () => {
        const latitude = Number(manualLatitudeInput.value);
        const longitude = Number(manualLongitudeInput.value);
        if (!isValidLatitude(latitude) || !isValidLongitude(longitude)) {
            return;
        }

        syncCoordinates(latitude, longitude, { centerMap: true });
    };

    manualLatitudeInput.addEventListener("input", syncFromManualInputs);
    manualLongitudeInput.addEventListener("input", syncFromManualInputs);

    if (window.L && mapElement) {
        map = window.L.map(mapElement, {
            zoomControl: true,
        }).setView(defaultCoords, 5);

        window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);

        map.on("click", (event) => {
            const { lat, lng } = event.latlng;
            syncCoordinates(lat, lng, { centerMap: true });
        });

        mapStatus.textContent = "Click on the map to choose a location, or drag the marker after placing it.";
    } else {
        showManualMode(true);
        mapStatus.textContent = "Map unavailable. Enter the coordinates manually below.";
    }

    return {
        showManualMode: () => showManualMode(true),
        setCoordinates: (latitude, longitude, options = {}) => {
            syncCoordinates(latitude, longitude, options);
        },
    };
}

async function loadCurrentUserPlaces() {
    const token = getToken();
    if (!token) {
        return [];
    }

    return fetchJson("/api/v1/users/me/places", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

function createPlaceCardElement(place, options = {}) {
    const article = document.createElement("article");
    article.className = "place-card";
    article.dataset.placeId = place.id;
    article.innerHTML = buildPlaceCardMarkup(place);

    if (options.showDeleteAction) {
        const actions = document.createElement("div");
        actions.className = "place-card-actions";
        actions.innerHTML = `
            <button type="button" class="danger-button danger-button-soft" data-delete-place-card>
                Delete Place
            </button>
        `;
        article.appendChild(actions);
    }

    return article;
}

function buildPlaceCardMarkup(place) {
    return `
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
}

function syncVisibleAccountName(user) {
    const label = getUserLabel(user);
    document.querySelectorAll(".profile-name").forEach((element) => {
        element.textContent = label;
    });
    const profileName = document.getElementById("profile-name");
    if (profileName) {
        profileName.textContent = label;
    }
}

async function renderPlaceManagement(place) {
    const deleteButton = document.getElementById("delete-place-action");
    const actionMessage = document.getElementById("place-action-message");
    if (!deleteButton || !actionMessage) {
        return;
    }

    const user = await loadCurrentUser();
    if (!canManagePlace(place, user)) {
        deleteButton.classList.add("hidden");
        return;
    }

    deleteButton.classList.remove("hidden");
    deleteButton.addEventListener("click", async () => {
        actionMessage.textContent = "";
        const deleted = await deletePlaceWithConfirmation(place.id, {
            onDeleting: () => {
                deleteButton.disabled = true;
                actionMessage.textContent = "Deleting this place...";
            },
            onSuccess: () => {
                actionMessage.textContent = "Place deleted. Redirecting...";
                window.setTimeout(() => {
                    window.location.href = "/profile.html";
                }, 500);
            },
            onError: (error) => {
                deleteButton.disabled = false;
                actionMessage.textContent = error.message || "Unable to delete this place right now.";
            },
        });
        if (!deleted) {
            deleteButton.disabled = false;
        }
    });
}

function canManagePlace(place, user) {
    return Boolean(
        place?.ownerId
        && user
        && (user.is_admin || user.id === place.ownerId),
    );
}

async function deletePlaceWithConfirmation(placeId, { onDeleting, onSuccess, onError } = {}) {
    if (!placeId) {
        return false;
    }
    if (!window.confirm("Delete this place permanently?")) {
        return false;
    }

    onDeleting?.();
    try {
        await fetchJson(`/api/v1/places/${encodeURIComponent(placeId)}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        onSuccess?.();
        return true;
    } catch (error) {
        onError?.(error);
        return false;
    }
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
    const phoneCard = document.getElementById("place-phone-card");
    const phoneLink = document.getElementById("place-phone-link");
    const description = document.getElementById("place-description");
    const tag = document.getElementById("place-tag");
    const amenities = document.getElementById("place-amenities");
    const image = document.getElementById("place-image");
    const gallery = document.getElementById("place-gallery");

    if (
        !title || !price || !host || !hostAvatar || !location || !phoneCard || !phoneLink
        || !description || !tag || !amenities || !image || !gallery
    ) {
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
    renderPlaceGallery(image, gallery, place);

    if (place.phoneNumber) {
        phoneCard.classList.remove("hidden");
        phoneLink.textContent = place.phoneNumber;
        phoneLink.href = `tel:${buildPhoneHref(place.phoneNumber)}`;
    } else {
        phoneCard.classList.add("hidden");
        phoneLink.textContent = "";
        phoneLink.href = "#";
    }

    amenities.innerHTML = "";
    (place.amenities.length ? place.amenities : ["WiFi", "Comfort", "Quiet"]).forEach((item) => {
        const chip = document.createElement("li");
        chip.textContent = item;
        amenities.appendChild(chip);
    });
}

function renderPlaceGallery(imageElement, galleryElement, place) {
    const photos = Array.isArray(place.photos) && place.photos.length
        ? place.photos
        : [{
            image_url: place.image,
            position: 0,
            imagePosition: place.imagePosition || "50% 50%",
        }];

    const setActivePhoto = (photo) => {
        imageElement.src = photo.image_url;
        imageElement.alt = `${place.title} interior`;
        imageElement.style.objectPosition = photo.imagePosition || place.imagePosition || "50% 50%";
        galleryElement.querySelectorAll("[data-photo-position]").forEach((button) => {
            button.classList.toggle("is-active", Number(button.dataset.photoPosition) === Number(photo.position || 0));
        });
    };

    setActivePhoto(photos[0]);
    galleryElement.innerHTML = "";

    if (photos.length <= 1) {
        galleryElement.classList.add("hidden");
        return;
    }

    galleryElement.classList.remove("hidden");
    photos.forEach((photo, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "place-gallery-thumb";
        button.dataset.photoPosition = String(photo.position ?? index);
        button.innerHTML = `
            <img src="${escapeHtml(photo.image_url)}" alt="${escapeHtml(place.title)} thumbnail ${index + 1}">
        `;
        button.addEventListener("click", () => {
            setActivePhoto(photo);
        });
        galleryElement.appendChild(button);
    });

    setActivePhoto(photos[0]);
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

    const isDemoPlace = isDemoPlaceId(placeId);

    if (getToken()) {
        action.textContent = isDemoPlace ? "Review a Real Place" : "Add Review";
        action.href = isDemoPlace
            ? "/add_review.html"
            : `/add_review.html?place_id=${encodeURIComponent(placeId)}`;
    } else {
        const next = isDemoPlace
            ? "/add_review.html"
            : `/add_review.html?place_id=${placeId}`;
        action.textContent = isDemoPlace ? "Login to Review Real Places" : "Login to Add Review";
        action.href = `/login.html?next=${encodeURIComponent(next)}`;
    }
}

async function loadPlaces() {
    const apiPlaces = await loadApiPlaces();
    if (apiPlaces.length) {
        return apiPlaces;
    }

    return FALLBACK_PLACES.map((place) => normalizePlace(place));
}

async function loadApiPlaces() {
    try {
        const data = await fetchJson("/api/v1/places/");
        if (Array.isArray(data)) {
            const ownerCache = new Map();

            return await Promise.all(data.map(async (place, index) => {
                let owner = place.owner || null;
                const ownerId = owner?.id || place.owner_id;

                if (!owner && ownerId) {
                    if (!ownerCache.has(ownerId)) {
                        ownerCache.set(
                            ownerId,
                            fetchJson(`/api/v1/users/${ownerId}`).catch(() => null),
                        );
                    }
                    owner = await ownerCache.get(ownerId);
                }

                return normalizePlace({ ...place, owner }, index);
            }));
        }
    } catch (error) {
        // The browse flow can use front-end demo places as a fallback.
    }

    return [];
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
    const photos = normalizePlacePhotos(place, media);
    const amenities = Array.isArray(place.amenities)
        ? place.amenities.map((item) => typeof item === "string" ? item : item.name).filter(Boolean)
        : media.amenities || [];
    const customAmenities = Array.isArray(place.custom_amenities)
        ? place.custom_amenities.map((item) => String(item || "").trim()).filter(Boolean)
        : [];
    const mergedAmenities = uniqueValues([...amenities, ...customAmenities]);

    const owner = place.owner || {
        id: place.owner_id || media.hostSeed,
        userName: media.hostName,
        first_name: media.hostName?.split(" ")[0] || "HBnB",
        last_name: media.hostName?.split(" ").slice(1).join(" ") || "Host",
    };
    const ownerId = place.owner_id || (place.owner && !isDemoPlaceId(place.id) ? place.owner.id : null);

    return {
        id: place.id || media.id || `place-${index + 1}`,
        ownerId,
        title: place.title || media.title || "Untitled stay",
        price: Number(place.price || media.price || 0),
        description: place.description || media.description || "A calm, well-balanced stay designed for simple comfort.",
        location: place.location || formatLocation(place, media.location),
        host: owner,
        hostName: getUserLabel(owner) || media.hostName || "HBnB Host",
        image: photos[0]?.image_url || place.image_url || place.image || media.image,
        photos,
        imagePosition: place.imagePosition || media.imagePosition || "50% 50%",
        phoneNumber: place.phone_number || place.phoneNumber || null,
        phoneCountryIso: place.phone_country_iso || place.phoneCountryIso || null,
        customAmenities,
        tag: place.tag || media.tag || mergedAmenities[0] || "Curated stay",
        amenities: mergedAmenities,
    };
}

function normalizePlacePhotos(place, media) {
    const imagePosition = place.imagePosition || media.imagePosition || "50% 50%";
    const apiPhotos = Array.isArray(place.photos)
        ? place.photos
            .map((photo, index) => ({
                id: photo.id || `${place.id || media.id || "place"}-photo-${index}`,
                image_url: photo.image_url,
                position: Number(photo.position ?? index),
                imagePosition,
            }))
            .filter((photo) => Boolean(photo.image_url))
            .sort((left, right) => left.position - right.position)
        : [];

    if (apiPhotos.length) {
        return apiPhotos;
    }

    const fallbackImage = place.image_url || place.image || media.image;
    if (!fallbackImage) {
        return [];
    }

    return [{
        id: `${place.id || media.id || "place"}-photo-0`,
        image_url: fallbackImage,
        position: 0,
        imagePosition,
    }];
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

function isDemoPlaceId(placeId) {
    return Boolean(placeId && PLACE_MEDIA[placeId]);
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

function buildGuestAccessBanner(text, nextPath) {
    const target = nextPath || window.location.pathname;
    const loginHref = `/login.html?next=${encodeURIComponent(target)}`;
    const signupHref = `/signup.html?next=${encodeURIComponent(target)}`;

    return `
        <strong>${escapeHtml(text)}</strong>
        <div class="banner-actions">
            <a class="utility-link" href="${signupHref}">Sign up</a>
            <a class="login-button" href="${loginHref}">Login</a>
        </div>
    `;
}

function uniqueValues(values) {
    const normalized = [];
    const seen = new Set();

    values.forEach((value) => {
        const item = String(value || "").trim();
        if (!item) {
            return;
        }
        const lowered = item.toLowerCase();
        if (seen.has(lowered)) {
            return;
        }
        seen.add(lowered);
        normalized.push(item);
    });

    return normalized;
}

function buildPhoneHref(phoneNumber) {
    return String(phoneNumber || "").replace(/[^\d+]/g, "");
}

function formatLocation(place, fallback) {
    if (typeof place?.latitude === "number" && typeof place?.longitude === "number") {
        return `Lat ${place.latitude.toFixed(2)} · Lng ${place.longitude.toFixed(2)}`;
    }

    return fallback || "France";
}

function isValidLatitude(value) {
    return Number.isFinite(Number(value)) && Number(value) >= -90 && Number(value) <= 90;
}

function isValidLongitude(value) {
    return Number.isFinite(Number(value)) && Number(value) >= -180 && Number(value) <= 180;
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
    if (options.body && !(options.body instanceof FormData) && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
        if (response.status === 401 && shouldHandleUnauthorized(url)) {
            handleUnauthorizedSession();
        }
        const message = payload.error || payload.message || "Request failed.";
        const error = new Error(message);
        error.status = response.status;
        error.fields = payload.fields || {};
        throw error;
    }

    return payload;
}

function shouldHandleUnauthorized(url) {
    return Boolean(
        getToken()
        && !String(url).includes("/api/v1/auth/login")
        && !String(url).includes("/api/v1/auth/signup"),
    );
}

function handleUnauthorizedSession() {
    clearToken();
    const next = `${window.location.pathname}${window.location.search}`;
    const loginUrl = new URL("/login.html", window.location.origin);
    loginUrl.searchParams.set("session", "expired");
    loginUrl.searchParams.set("next", next);
    window.location.href = loginUrl.toString();
}

async function searchAddress(query) {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&q=${encodeURIComponent(query)}`,
        {
            headers: {
                Accept: "application/json",
            },
        },
    );

    if (!response.ok) {
        throw new Error("Address search failed.");
    }

    const payload = await response.json().catch(() => []);
    return Array.isArray(payload) ? payload : [];
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
