const STORAGE_KEY = "hbnb_access_token";
const LANGUAGE_STORAGE_KEY = "hbnb_lang";
const THEME_STORAGE_KEY = "hbnb_theme";
const DEFAULT_LANGUAGE = "en";
const SUPPORTED_LANGUAGES = new Set(["en", "fr"]);
const SUPPORTED_THEMES = new Set(["system", "light", "dark"]);
const DEFAULT_AVATAR_URL = "/static/img/avatar-placeholder.svg";

const TRANSLATIONS = {
    en: {
        "page.title.index": "Find Your Next Stay",
        "page.title.login": "Sign In",
        "page.title.signup": "Sign Up",
        "page.title.profile": "Your Profile",
        "page.title.settings": "Account Settings",
        "page.title.privacy": "Privacy Notice",
        "page.title.data-rights": "Data Rights",
        "page.title.place": "Place Details",
        "page.title.add-review": "Add Your Review",
        "page.title.add-place": "Create Place",
        "page.title.add-user": "Create User",
        "brand.tagline": "Slow stays, bright spaces.",
        "brand.home_aria": "HBnB Home",
        "nav.places": "Places",
        "nav.api_docs": "API Docs",
        "nav.settings": "Settings",
        "nav.primary": "Primary navigation",
        "preferences.language": "Language",
        "preferences.theme": "Theme",
        "preferences.language_selector": "Language selector",
        "preferences.theme_selector": "Theme selector",
        "theme.system": "System",
        "theme.light": "Light",
        "theme.dark": "Dark",
        "theme.switch_to_dark": "Switch to dark mode",
        "theme.switch_to_light": "Switch to light mode",
        "preferences.switch_to_french": "Switch to French",
        "preferences.switch_to_english": "Switch to English",
        "auth.sign_up": "Sign up",
        "auth.login": "Login",
        "auth.sign_in": "Sign In",
        "auth.create_account": "Create Account",
        "auth.connected": "Connected",
        "auth.profile": "Profile",
        "auth.settings": "Settings",
        "auth.data_rights": "Data rights",
        "auth.logout": "Logout",
        "auth.new_place": "New Place",
        "auth.open_account_menu": "Open account menu",
        "footer.privacy": "Privacy",
        "footer.data_rights": "Data rights",
        "footer.rights": "All rights reserved.",
        "index.hero.eyebrow": "Curated escapes",
        "index.hero.title": "Comfort-first stays for weekends that feel longer.",
        "index.hero.text": "Browse calm, bright spaces with clear pricing, thoughtful amenities, and a cleaner booking flow.",
        "index.quick_actions.eyebrow": "Quick actions",
        "index.quick_actions.title": "Plan your next move.",
        "index.quick_actions.mode_guest": "Guest mode",
        "index.quick_actions.mode_member": "Signed in",
        "index.quick_actions.aria": "Quick actions",
        "quick.view_places": "View Places",
        "quick.browse_now": "Browse now",
        "quick.sign_up": "Sign Up",
        "quick.create_account": "Create account",
        "quick.login": "Login",
        "quick.continue": "Continue",
        "quick.new_place": "New Place",
        "quick.start_hosting": "Start hosting",
        "quick.profile": "Profile",
        "quick.account_tools": "Account tools",
        "quick.indicator.open": "Open",
        "quick.indicator.start": "Start",
        "quick.indicator.now": "Now",
        "quick.indicator.create": "Create",
        "quick.indicator.manage": "Manage",
        "index.available.eyebrow": "Available now",
        "index.available.title": "List of Places",
        "index.available.text": "The cards below are intentionally larger, calmer, and easier to scan on wide screens.",
        "index.places.sr_title": "Places",
        "index.noscript": "Enable JavaScript to load live places from the Flask API.",
        "place.view_details": "View Details",
        "place.view_details_for": "View details for {title}",
        "login.eyebrow": "Welcome back",
        "login.title": "Login Form",
        "login.text": "Sign in with your HBnB account to create reviews and access authenticated actions.",
        "signup.eyebrow": "New account",
        "signup.title": "Sign Up",
        "signup.text": "Create your HBnB account to publish places, leave reviews, and keep your stays connected to the API.",
        "profile.eyebrow": "Account overview",
        "profile.title": "Your Profile",
        "profile.connected_account": "Connected account",
        "profile.account": "Account",
        "profile.places_published": "places published",
        "profile.account_role": "account role",
        "profile.published_stays": "Published stays",
        "profile.your_places": "Your Places",
        "settings.eyebrow": "Account preferences",
        "settings.title": "Settings",
        "settings.text": "Update your profile details and avatar shown across your account.",
        "settings.save_changes": "Save Changes",
        "settings.photo_title": "Profile photo",
        "settings.photo_help": "Upload JPG, PNG, or WEBP up to 3 MB. Replacing removes the previous photo.",
        "settings.photo_storage_note": "Stored on this server with a randomized filename. Replacing deletes the previous file.",
        "settings.photo_upload": "Upload Photo",
        "settings.photo_remove": "Remove Photo",
        "settings.photo.uploading": "Uploading your profile photo...",
        "settings.photo.success": "Profile photo updated successfully.",
        "settings.photo.remove_pending": "Removing your profile photo...",
        "settings.photo.remove_success": "Profile photo removed.",
        "settings.photo.no_file": "Choose a photo before uploading.",
        "settings.photo.error": "Unable to update your profile photo right now.",
        "settings.photo.remove_error": "Unable to remove your profile photo right now.",
        "privacy.eyebrow": "Data transparency",
        "privacy.title": "Privacy Notice",
        "privacy.text": "This page explains which personal data is used in HBnB, why it is used, and how to exercise your rights.",
        "privacy.section.data_title": "Data we process",
        "privacy.section.data_body": "Account details (name, email, hashed password), profile photo if uploaded, your places, reviews, and technical authentication data.",
        "privacy.section.purpose_title": "Purpose and legal basis",
        "privacy.section.purpose_body": "Data is processed to provide the service (account management, place publication, reviews, and security of access).",
        "privacy.section.storage_title": "Storage and retention",
        "privacy.section.storage_body": "Uploaded profile photos and place images are stored on this server in internal upload folders with randomized file names.",
        "privacy.section.contact_title": "How to exercise your rights",
        "privacy.section.contact_body": "Open the Data Rights page to export your data or delete your account. For additional requests, contact the project administrator.",
        "rights.eyebrow": "Your GDPR rights",
        "rights.title": "Data Rights",
        "rights.text": "Access, portability, and erasure options are available from this page for your account.",
        "rights.section.summary_title": "Your key rights",
        "rights.section.summary_body": "Under GDPR, you can request access, rectification, deletion, or portability of your personal data.",
        "rights.list.access": "Right of access to your personal data.",
        "rights.list.rectify": "Right to rectify inaccurate personal data.",
        "rights.list.erase": "Right to erase your account data when applicable.",
        "rights.list.portability": "Right to receive your data in a structured format.",
        "rights.account_tools_title": "Account actions",
        "rights.account_tools_text": "Export downloads your profile, places, and reviews in JSON. Delete permanently removes your account and owned uploads.",
        "rights.export_button": "Download my data",
        "rights.delete_button": "Delete my account",
        "rights.guest_required": "You need an account to access data-rights actions.",
        "rights.load_error": "Unable to load your data-rights actions right now.",
        "rights.export_pending": "Preparing your personal data export...",
        "rights.export_success": "Export ready. Download started.",
        "rights.export_error": "Unable to export your data right now.",
        "rights.delete_confirm": "Delete your account permanently? This action cannot be undone.",
        "rights.delete_pending": "Deleting your account...",
        "rights.delete_success": "Account deleted. Redirecting...",
        "rights.delete_error": "Unable to delete your account right now.",
        "add_review.eyebrow": "Share your stay",
        "add_review.title": "Add Review Form",
        "add_review.text": "This form is available only for authenticated users. Log in first, then rate the place and leave a short comment.",
        "add_review.login_required": "You need to log in before sending a review.",
        "add_review.comment_placeholder": "Tell future guests what stood out during your stay.",
        "add_review.publish": "Publish Review",
        "add_place.eyebrow": "Host tools",
        "add_place.title": "Create Place",
        "add_place.text": "Publish a real place from the website and send it straight to the Flask API.",
        "add_place.title_placeholder": "Canal Loft",
        "add_place.description_placeholder": "Describe the place, its atmosphere, and what makes it useful for guests.",
        "add_place.price_placeholder": "145",
        "add_place.price_help": "Digits only, up to 7 numbers.",
        "add_place.phone_number": "Phone number",
        "add_place.phone_placeholder": "6 12 34 56 78",
        "add_place.phone_help": "Choose the country first. We store one international number starting with the correct + code.",
        "add_place.choose_amenities": "Choose Amenities",
        "add_place.amenity_placeholder": "Sauna",
        "add_place.add_amenity": "Add amenity",
        "add_place.amenities_help": "Choose existing amenities or add a new one to the global catalog for future filtering.",
        "add_place.photos": "Place photos",
        "add_place.photos_help": "Accepted formats: JPG, PNG, WEBP up to 5 MB each. You can add up to 5 photos.",
        "add_place.search_address": "Search an address",
        "add_place.address_placeholder": "10 rue de Rivoli, Paris",
        "add_place.address_help": "Search an address to place the marker automatically on the map.",
        "add_place.map_location": "Location on the map",
        "add_place.map_aria": "Choose a point on the map",
        "add_place.map_help": "Click on the map to place your marker, or use manual coordinates below.",
        "add_place.enter_coordinates": "Enter coordinates manually",
        "add_place.no_location": "No location selected yet.",
        "add_place.latitude_placeholder": "48.8566",
        "add_place.longitude_placeholder": "2.3522",
        "add_place.guest_required": "You need an account before creating a place.",
        "add_place.address_prompt": "Enter an address before searching.",
        "add_place.searching_address": "Searching address...",
        "add_place.no_address_found": "No address found. Try a more precise query or place the point manually.",
        "add_place.choose_address_result": "Choose the result that matches your place.",
        "add_place.address_selected": "Address selected. You can still adjust the point on the map.",
        "add_place.address_search_unavailable": "Address search is unavailable right now. You can still use the map or manual coordinates.",
        "add_place.creating": "Creating your place...",
        "add_place.creating_button": "Creating...",
        "add_place.created_success": "Place created. Redirecting to the detail page...",
        "add_place.create_error": "Unable to create this place right now.",
        "add_place.init_error": "This form could not initialize correctly. Refresh the page and try again.",
        "add_user.eyebrow": "Admin tools",
        "add_user.title": "Create User",
        "add_user.text": "Add a new platform user from the website. This action uses the existing admin-only user API.",
        "add_user.create": "Create User",
        "place.eyebrow": "Stay overview",
        "place.title": "Place Details",
        "place.login_add_review": "Login to Add Review",
        "place.delete_place": "Delete Place",
        "place.create_place": "Create Place",
        "place.info_sr": "Place information",
        "place.prev_photo": "Previous photo",
        "place.next_photo": "Next photo",
        "place.photo_gallery": "Place photo gallery",
        "place.host": "Host",
        "place.location": "Location",
        "place.host_contact": "Host contact",
        "place.amenities": "Amenities",
        "reviews.eyebrow": "Guest feedback",
        "reviews.title": "Reviews",
        "reviews.text": "Real comments are loaded from the API when available.",
        "common.first_name": "First Name",
        "common.last_name": "Last Name",
        "common.email": "Email",
        "common.password": "Password",
        "common.place": "Place",
        "common.choose_place": "Choose a place",
        "common.rating": "Rating",
        "common.comment": "Comment",
        "common.title": "Title",
        "common.description": "Description",
        "common.price": "Price",
        "common.search": "Search",
        "common.latitude": "Latitude",
        "common.longitude": "Longitude",
        "common.per_night": "/ night",
        "rating.5": "5 - Excellent",
        "rating.4": "4 - Very Good",
        "rating.3": "3 - Good",
        "rating.2": "2 - Fair",
        "rating.1": "1 - Poor",
        "role.admin": "Admin",
        "role.member": "Member",
        "profile.avatar_alt": "{name} avatar",
        "form.required_place": "Choose a real place before publishing your review.",
        "form.required_rating": "Select a rating between 1 and 5.",
        "form.required_comment": "Comment is required.",
        "form.comment_max": "Comment must stay within 500 characters.",
        "form.title_required": "Title is required.",
        "form.title_max": "Title must stay within 100 characters.",
        "form.price_required": "Price is required.",
        "form.price_digits": "Price must use digits only, up to 7 numbers.",
        "form.location_required": "Choose a point on the map or enter valid coordinates before creating the place.",
        "form.phone_invalid": "Enter a valid phone number for the selected country.",
        "form.fix_fields": "Fix these fields before publishing your review: {fields}.",
        "form.validation_failed": "Validation failed.",
        "amenity.none": "No amenities yet. Add the first one above.",
        "amenity.prompt_name": "Enter an amenity name before adding it.",
        "amenity.adding": "Adding amenity...",
        "amenity.ready": "Amenity ready and selected for this place.",
        "amenity.add_error": "Unable to add this amenity right now.",
        "amenity.loading": "Loading available amenities...",
        "amenity.empty_catalog": "No amenities are in the catalog yet. Add the first one below.",
        "amenity.load_error": "Unable to load current amenities. You can still add a new one below.",
        "map.selected": "Selected: {lat}, {lng}",
        "map.hide_manual": "Hide manual coordinates",
        "map.click_help": "Click on the map to choose a location, or drag the marker after placing it.",
        "map.unavailable": "Map unavailable. Enter the coordinates manually below.",
        "review.message.publishing": "Publishing your review...",
        "review.message.success": "Review published. Redirecting to the place page...",
        "review.message.error": "Unable to publish your review right now.",
        "review.message.login_required": "You need to <a href=\"/login.html?next={next}\">log in</a> before sending a review.",
        "review.message.no_real_places": "No real places are available to review yet. The curated home-page cards are front-end demo previews only.",
        "review.message.demo_selected": "This selected place is only a front-end demo preview. Choose a real place from the list to publish a review.",
        "login.message.registered": "Account created. You can sign in now.",
        "login.message.session_expired": "Your session expired. Please sign in again.",
        "login.message.signing_in": "Signing you in...",
        "login.message.success": "Login successful. Redirecting...",
        "login.message.error": "Unable to log in with these credentials.",
        "signup.message.creating": "Creating your account...",
        "signup.message.success": "Account created. Redirecting to login...",
        "signup.message.error": "Unable to create your account right now.",
        "signup.banner.signed_in": "You are already signed in.",
        "signup.banner.browse_places": "Browse places",
        "signup.banner.create_place": "Create a place",
        "profile.guest_required": "You need an account to view your profile.",
        "profile.no_email": "No email available",
        "profile.empty.title": "No published places yet.",
        "profile.empty.action": "Create your first place",
        "profile.delete.pending": "Deleting this place...",
        "profile.delete.done": "Place deleted.",
        "profile.delete.error": "Unable to delete this place right now.",
        "profile.load_error": "Unable to load your profile right now.",
        "settings.guest_required": "You need an account to edit your settings.",
        "settings.load_error": "Unable to load your settings.",
        "settings.message.saving": "Saving your changes...",
        "settings.message.success": "Profile updated successfully.",
        "settings.save_error": "Unable to save your settings right now.",
        "guest_banner.sign_up": "Sign up",
        "guest_banner.login": "Login",
        "place.delete.confirm": "Delete this place permanently?",
        "reviews.empty.title": "No reviews yet",
        "reviews.empty.cta": "Be the first",
        "reviews.empty.text": "This place does not have any published review yet.",
        "reviews.guest": "Guest",
        "reviews.guest_avatar": "Guest avatar",
        "place.action.review_real": "Review a Real Place",
        "place.action.add_review": "Add Review",
        "place.action.login_review_real": "Login to Review Real Places",
        "place.action.login_add_review": "Login to Add Review",
        "place.hosted_by": "Hosted by {host}",
        "place.delete.redirect": "Place deleted. Redirecting...",
        "place.default_host": "HBnB Host",
        "place.default_location": "France",
        "place.default_tag": "Thoughtful stay",
        "place.default_description": "A calm, well-balanced stay designed for simple comfort.",
        "error.request_failed": "Request failed.",
        "error.address_search_failed": "Address search failed.",
    },
    fr: {
        "page.title.index": "Trouvez votre prochain séjour",
        "page.title.login": "Connexion",
        "page.title.signup": "Inscription",
        "page.title.profile": "Votre profil",
        "page.title.settings": "Paramètres du compte",
        "page.title.privacy": "Politique de confidentialité",
        "page.title.data-rights": "Droits sur les données",
        "page.title.place": "Détails du logement",
        "page.title.add-review": "Ajouter votre avis",
        "page.title.add-place": "Créer un logement",
        "page.title.add-user": "Créer un utilisateur",
        "brand.tagline": "Séjours paisibles, espaces lumineux.",
        "brand.home_aria": "Accueil HBnB",
        "nav.places": "Logements",
        "nav.api_docs": "Documentation API",
        "nav.settings": "Paramètres",
        "nav.primary": "Navigation principale",
        "preferences.language": "Langue",
        "preferences.theme": "Thème",
        "preferences.language_selector": "Sélecteur de langue",
        "preferences.theme_selector": "Sélecteur de thème",
        "theme.system": "Système",
        "theme.light": "Clair",
        "theme.dark": "Sombre",
        "theme.switch_to_dark": "Passer en mode sombre",
        "theme.switch_to_light": "Passer en mode clair",
        "preferences.switch_to_french": "Passer en français",
        "preferences.switch_to_english": "Passer en anglais",
        "auth.sign_up": "S’inscrire",
        "auth.login": "Connexion",
        "auth.sign_in": "Se connecter",
        "auth.create_account": "Créer un compte",
        "auth.connected": "Connecté",
        "auth.profile": "Profil",
        "auth.settings": "Paramètres",
        "auth.data_rights": "Droits RGPD",
        "auth.logout": "Déconnexion",
        "auth.new_place": "Nouveau logement",
        "auth.open_account_menu": "Ouvrir le menu du compte",
        "footer.privacy": "Confidentialité",
        "footer.data_rights": "Droits RGPD",
        "footer.rights": "Tous droits réservés.",
        "index.hero.eyebrow": "Escapades sélectionnées",
        "index.hero.title": "Des séjours pensés pour le confort.",
        "index.hero.text": "Parcourez des lieux calmes et lumineux avec des prix clairs, des équipements utiles et un parcours plus fluide.",
        "index.quick_actions.eyebrow": "Actions rapides",
        "index.quick_actions.title": "Planifiez votre prochaine étape.",
        "index.quick_actions.mode_guest": "Mode invité",
        "index.quick_actions.mode_member": "Connecté",
        "index.quick_actions.aria": "Actions rapides",
        "quick.view_places": "Voir les logements",
        "quick.browse_now": "Parcourir",
        "quick.sign_up": "S’inscrire",
        "quick.create_account": "Créer un compte",
        "quick.login": "Connexion",
        "quick.continue": "Continuer",
        "quick.new_place": "Nouveau logement",
        "quick.start_hosting": "Commencer à publier",
        "quick.profile": "Profil",
        "quick.account_tools": "Outils du compte",
        "quick.indicator.open": "Ouvrir",
        "quick.indicator.start": "Démarrer",
        "quick.indicator.now": "Maintenant",
        "quick.indicator.create": "Créer",
        "quick.indicator.manage": "Gérer",
        "index.available.eyebrow": "Disponible maintenant",
        "index.available.title": "Liste des logements",
        "index.available.text": "Les cartes ci-dessous sont plus larges, plus calmes et plus faciles à lire sur grand écran.",
        "index.places.sr_title": "Logements",
        "index.noscript": "Activez JavaScript pour charger les logements en direct depuis l’API Flask.",
        "place.view_details": "Voir les détails",
        "place.view_details_for": "Voir les détails de {title}",
        "login.eyebrow": "Bon retour",
        "login.title": "Formulaire de connexion",
        "login.text": "Connectez-vous avec votre compte HBnB pour créer des avis et accéder aux actions authentifiées.",
        "signup.eyebrow": "Nouveau compte",
        "signup.title": "Inscription",
        "signup.text": "Créez votre compte HBnB pour publier des logements, laisser des avis et garder vos séjours liés à l’API.",
        "profile.eyebrow": "Vue du compte",
        "profile.title": "Votre profil",
        "profile.connected_account": "Compte connecté",
        "profile.account": "Compte",
        "profile.places_published": "logements publiés",
        "profile.account_role": "rôle du compte",
        "profile.published_stays": "Séjours publiés",
        "profile.your_places": "Vos logements",
        "settings.eyebrow": "Préférences du compte",
        "settings.title": "Paramètres",
        "settings.text": "Mettez à jour les informations et l’avatar affichés sur votre compte.",
        "settings.save_changes": "Enregistrer les modifications",
        "settings.photo_title": "Photo de profil",
        "settings.photo_help": "Formats acceptés : JPG, PNG ou WEBP jusqu’à 3 Mo. Un remplacement supprime la photo précédente.",
        "settings.photo_storage_note": "Stockée sur ce serveur avec un nom de fichier aléatoire. Un remplacement supprime le fichier précédent.",
        "settings.photo_upload": "Téléverser la photo",
        "settings.photo_remove": "Supprimer la photo",
        "settings.photo.uploading": "Téléversement de la photo de profil...",
        "settings.photo.success": "Photo de profil mise à jour.",
        "settings.photo.remove_pending": "Suppression de la photo de profil...",
        "settings.photo.remove_success": "Photo de profil supprimée.",
        "settings.photo.no_file": "Choisissez une photo avant de téléverser.",
        "settings.photo.error": "Impossible de mettre à jour la photo de profil pour le moment.",
        "settings.photo.remove_error": "Impossible de supprimer la photo de profil pour le moment.",
        "privacy.eyebrow": "Transparence des données",
        "privacy.title": "Politique de confidentialité",
        "privacy.text": "Cette page explique quelles données personnelles sont utilisées dans HBnB, pourquoi elles le sont, et comment exercer vos droits.",
        "privacy.section.data_title": "Données traitées",
        "privacy.section.data_body": "Informations de compte (nom, email, mot de passe haché), photo de profil si téléversée, vos logements, vos avis, et données techniques d'authentification.",
        "privacy.section.purpose_title": "Finalité et base légale",
        "privacy.section.purpose_body": "Les données sont traitées pour fournir le service (gestion de compte, publication de logements, avis, et sécurité des accès).",
        "privacy.section.storage_title": "Stockage et conservation",
        "privacy.section.storage_body": "Les photos de profil et de logement sont stockées sur ce serveur dans des dossiers d'upload internes avec des noms de fichiers aléatoires.",
        "privacy.section.contact_title": "Comment exercer vos droits",
        "privacy.section.contact_body": "Ouvrez la page Droits RGPD pour exporter vos données ou supprimer votre compte. Pour toute demande complémentaire, contactez l'administrateur du projet.",
        "rights.eyebrow": "Vos droits RGPD",
        "rights.title": "Droits sur les données",
        "rights.text": "Les options d'accès, de portabilité et d'effacement de votre compte sont disponibles sur cette page.",
        "rights.section.summary_title": "Vos droits essentiels",
        "rights.section.summary_body": "Selon le RGPD, vous pouvez demander l'accès, la rectification, l'effacement ou la portabilité de vos données personnelles.",
        "rights.list.access": "Droit d'accès à vos données personnelles.",
        "rights.list.rectify": "Droit de rectifier des données inexactes.",
        "rights.list.erase": "Droit d'effacer les données de votre compte lorsque applicable.",
        "rights.list.portability": "Droit de recevoir vos données dans un format structuré.",
        "rights.account_tools_title": "Actions du compte",
        "rights.account_tools_text": "Exporter télécharge votre profil, vos logements et vos avis en JSON. Supprimer efface définitivement votre compte et vos uploads.",
        "rights.export_button": "Télécharger mes données",
        "rights.delete_button": "Supprimer mon compte",
        "rights.guest_required": "Vous avez besoin d'un compte pour accéder aux actions RGPD.",
        "rights.load_error": "Impossible de charger les actions RGPD pour le moment.",
        "rights.export_pending": "Préparation de l'export de vos données...",
        "rights.export_success": "Export prêt. Téléchargement lancé.",
        "rights.export_error": "Impossible d'exporter vos données pour le moment.",
        "rights.delete_confirm": "Supprimer définitivement votre compte ? Cette action est irréversible.",
        "rights.delete_pending": "Suppression de votre compte...",
        "rights.delete_success": "Compte supprimé. Redirection...",
        "rights.delete_error": "Impossible de supprimer votre compte pour le moment.",
        "add_review.eyebrow": "Partagez votre séjour",
        "add_review.title": "Ajouter un avis",
        "add_review.text": "Ce formulaire est disponible uniquement pour les utilisateurs connectés. Connectez-vous, puis notez le logement et laissez un commentaire.",
        "add_review.login_required": "Vous devez vous connecter avant d’envoyer un avis.",
        "add_review.comment_placeholder": "Dites aux futurs voyageurs ce qui vous a marqué pendant votre séjour.",
        "add_review.publish": "Publier l’avis",
        "add_place.eyebrow": "Outils hôte",
        "add_place.title": "Créer un logement",
        "add_place.text": "Publiez un vrai logement depuis le site et envoyez-le directement à l’API Flask.",
        "add_place.title_placeholder": "Loft Canal",
        "add_place.description_placeholder": "Décrivez le logement, son ambiance et ce qui le rend pratique pour les voyageurs.",
        "add_place.price_placeholder": "145",
        "add_place.price_help": "Chiffres uniquement, jusqu’à 7 caractères.",
        "add_place.phone_number": "Numéro de téléphone",
        "add_place.phone_placeholder": "6 12 34 56 78",
        "add_place.phone_help": "Choisissez d’abord le pays. Nous stockons un numéro international commençant par le bon indicatif +.",
        "add_place.choose_amenities": "Choisir les équipements",
        "add_place.amenity_placeholder": "Sauna",
        "add_place.add_amenity": "Ajouter un équipement",
        "add_place.amenities_help": "Choisissez des équipements existants ou ajoutez-en un nouveau au catalogue global.",
        "add_place.photos": "Photos du logement",
        "add_place.photos_help": "Formats acceptés: JPG, PNG, WEBP jusqu’à 5 Mo chacun. Vous pouvez ajouter jusqu’à 5 photos.",
        "add_place.search_address": "Rechercher une adresse",
        "add_place.address_placeholder": "10 rue de Rivoli, Paris",
        "add_place.address_help": "Recherchez une adresse pour placer automatiquement le marqueur sur la carte.",
        "add_place.map_location": "Emplacement sur la carte",
        "add_place.map_aria": "Choisir un point sur la carte",
        "add_place.map_help": "Cliquez sur la carte pour placer votre marqueur, ou utilisez la saisie manuelle ci-dessous.",
        "add_place.enter_coordinates": "Saisir les coordonnées manuellement",
        "add_place.no_location": "Aucun emplacement sélectionné.",
        "add_place.latitude_placeholder": "48.8566",
        "add_place.longitude_placeholder": "2.3522",
        "add_place.guest_required": "Vous avez besoin d’un compte pour créer un logement.",
        "add_place.address_prompt": "Saisissez une adresse avant de lancer la recherche.",
        "add_place.searching_address": "Recherche d’adresse en cours...",
        "add_place.no_address_found": "Aucune adresse trouvée. Essayez une requête plus précise ou placez le point manuellement.",
        "add_place.choose_address_result": "Choisissez le résultat qui correspond à votre logement.",
        "add_place.address_selected": "Adresse sélectionnée. Vous pouvez encore ajuster le point sur la carte.",
        "add_place.address_search_unavailable": "La recherche d’adresse est indisponible pour le moment. Utilisez la carte ou la saisie manuelle.",
        "add_place.creating": "Création de votre logement...",
        "add_place.creating_button": "Création...",
        "add_place.created_success": "Logement créé. Redirection vers la page de détail...",
        "add_place.create_error": "Impossible de créer ce logement pour le moment.",
        "add_place.init_error": "Le formulaire n’a pas pu s’initialiser correctement. Actualisez la page puis réessayez.",
        "add_user.eyebrow": "Outils admin",
        "add_user.title": "Créer un utilisateur",
        "add_user.text": "Ajoutez un nouvel utilisateur depuis le site. Cette action utilise l’API utilisateur réservée aux admins.",
        "add_user.create": "Créer un utilisateur",
        "place.eyebrow": "Vue du séjour",
        "place.title": "Détails du logement",
        "place.login_add_review": "Se connecter pour ajouter un avis",
        "place.delete_place": "Supprimer le logement",
        "place.create_place": "Créer un logement",
        "place.info_sr": "Informations du logement",
        "place.prev_photo": "Photo précédente",
        "place.next_photo": "Photo suivante",
        "place.photo_gallery": "Galerie photos du logement",
        "place.host": "Hôte",
        "place.location": "Localisation",
        "place.host_contact": "Contact hôte",
        "place.amenities": "Équipements",
        "reviews.eyebrow": "Retours voyageurs",
        "reviews.title": "Avis",
        "reviews.text": "Les commentaires réels sont chargés depuis l’API lorsque disponibles.",
        "common.first_name": "Prénom",
        "common.last_name": "Nom",
        "common.email": "Email",
        "common.password": "Mot de passe",
        "common.place": "Logement",
        "common.choose_place": "Choisir un logement",
        "common.rating": "Note",
        "common.comment": "Commentaire",
        "common.title": "Titre",
        "common.description": "Description",
        "common.price": "Prix",
        "common.search": "Rechercher",
        "common.latitude": "Latitude",
        "common.longitude": "Longitude",
        "common.per_night": "/ nuit",
        "rating.5": "5 - Excellent",
        "rating.4": "4 - Très bien",
        "rating.3": "3 - Bien",
        "rating.2": "2 - Correct",
        "rating.1": "1 - Faible",
        "role.admin": "Admin",
        "role.member": "Membre",
        "profile.avatar_alt": "avatar de {name}",
        "form.required_place": "Choisissez un vrai logement avant de publier votre avis.",
        "form.required_rating": "Sélectionnez une note entre 1 et 5.",
        "form.required_comment": "Le commentaire est obligatoire.",
        "form.comment_max": "Le commentaire doit rester sous 500 caractères.",
        "form.title_required": "Le titre est obligatoire.",
        "form.title_max": "Le titre doit rester sous 100 caractères.",
        "form.price_required": "Le prix est obligatoire.",
        "form.price_digits": "Le prix doit contenir uniquement des chiffres, jusqu’à 7 caractères.",
        "form.location_required": "Choisissez un point sur la carte ou saisissez des coordonnées valides avant de créer le logement.",
        "form.phone_invalid": "Saisissez un numéro valide pour le pays sélectionné.",
        "form.fix_fields": "Corrigez ces champs avant de publier votre avis: {fields}.",
        "form.validation_failed": "Validation échouée.",
        "amenity.none": "Aucun équipement pour le moment. Ajoutez le premier ci-dessus.",
        "amenity.prompt_name": "Saisissez un nom d’équipement avant d’ajouter.",
        "amenity.adding": "Ajout de l’équipement...",
        "amenity.ready": "Équipement prêt et sélectionné pour ce logement.",
        "amenity.add_error": "Impossible d’ajouter cet équipement pour le moment.",
        "amenity.loading": "Chargement des équipements disponibles...",
        "amenity.empty_catalog": "Aucun équipement n’est encore dans le catalogue. Ajoutez le premier ci-dessous.",
        "amenity.load_error": "Impossible de charger les équipements actuels. Vous pouvez en ajouter un nouveau ci-dessous.",
        "map.selected": "Sélectionné: {lat}, {lng}",
        "map.hide_manual": "Masquer les coordonnées manuelles",
        "map.click_help": "Cliquez sur la carte pour choisir un emplacement, ou déplacez le marqueur après l’avoir posé.",
        "map.unavailable": "Carte indisponible. Saisissez les coordonnées manuellement ci-dessous.",
        "review.message.publishing": "Publication de votre avis...",
        "review.message.success": "Avis publié. Redirection vers la page du logement...",
        "review.message.error": "Impossible de publier votre avis pour le moment.",
        "review.message.login_required": "Vous devez vous <a href=\"/login.html?next={next}\">connecter</a> avant d’envoyer un avis.",
        "review.message.no_real_places": "Aucun logement réel n’est disponible pour un avis pour le moment. Les cartes de la page d’accueil sont des démos front.",
        "review.message.demo_selected": "Ce logement sélectionné est une démo front. Choisissez un logement réel pour publier un avis.",
        "login.message.registered": "Compte créé. Vous pouvez maintenant vous connecter.",
        "login.message.session_expired": "Votre session a expiré. Connectez-vous à nouveau.",
        "login.message.signing_in": "Connexion en cours...",
        "login.message.success": "Connexion réussie. Redirection...",
        "login.message.error": "Impossible de se connecter avec ces identifiants.",
        "signup.message.creating": "Création de votre compte...",
        "signup.message.success": "Compte créé. Redirection vers la connexion...",
        "signup.message.error": "Impossible de créer votre compte pour le moment.",
        "signup.banner.signed_in": "Vous êtes déjà connecté.",
        "signup.banner.browse_places": "Voir les logements",
        "signup.banner.create_place": "Créer un logement",
        "profile.guest_required": "Vous avez besoin d’un compte pour afficher votre profil.",
        "profile.no_email": "Aucun email disponible",
        "profile.empty.title": "Aucun logement publié pour le moment.",
        "profile.empty.action": "Créer votre premier logement",
        "profile.delete.pending": "Suppression du logement...",
        "profile.delete.done": "Logement supprimé.",
        "profile.delete.error": "Impossible de supprimer ce logement pour le moment.",
        "profile.load_error": "Impossible de charger votre profil pour le moment.",
        "settings.guest_required": "Vous avez besoin d’un compte pour modifier vos paramètres.",
        "settings.load_error": "Impossible de charger vos paramètres.",
        "settings.message.saving": "Enregistrement de vos modifications...",
        "settings.message.success": "Profil mis à jour avec succès.",
        "settings.save_error": "Impossible d’enregistrer vos paramètres pour le moment.",
        "guest_banner.sign_up": "S’inscrire",
        "guest_banner.login": "Connexion",
        "place.delete.confirm": "Supprimer définitivement ce logement ?",
        "reviews.empty.title": "Aucun avis pour le moment",
        "reviews.empty.cta": "Soyez le premier",
        "reviews.empty.text": "Ce logement n’a pas encore d’avis publié.",
        "reviews.guest": "Invité",
        "reviews.guest_avatar": "Avatar invité",
        "place.action.review_real": "Noter un logement réel",
        "place.action.add_review": "Ajouter un avis",
        "place.action.login_review_real": "Se connecter pour noter un logement réel",
        "place.action.login_add_review": "Se connecter pour ajouter un avis",
        "place.hosted_by": "Hébergé par {host}",
        "place.delete.redirect": "Logement supprimé. Redirection...",
        "place.default_host": "Hôte HBnB",
        "place.default_location": "France",
        "place.default_tag": "Séjour sélectionné",
        "place.default_description": "Un séjour calme et équilibré, pensé pour un confort simple.",
        "error.request_failed": "La requête a échoué.",
        "error.address_search_failed": "La recherche d’adresse a échoué.",
    },
};

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
const INDEX_QUICK_ACTIONS = {
    guest: [
        {
            href: "#places-grid",
            icon: "GO",
            labelKey: "quick.view_places",
            hintKey: "quick.browse_now",
            indicatorKey: "quick.indicator.open",
        },
        {
            href: "/signup.html",
            icon: "UP",
            labelKey: "quick.sign_up",
            hintKey: "quick.create_account",
            indicatorKey: "quick.indicator.start",
        },
        {
            href: "/login.html",
            icon: "IN",
            labelKey: "quick.login",
            hintKey: "quick.continue",
            indicatorKey: "quick.indicator.now",
        },
    ],
    member: [
        {
            href: "#places-grid",
            icon: "GO",
            labelKey: "quick.view_places",
            hintKey: "quick.browse_now",
            indicatorKey: "quick.indicator.open",
        },
        {
            href: "/add_place.html",
            icon: "NEW",
            labelKey: "quick.new_place",
            hintKey: "quick.start_hosting",
            indicatorKey: "quick.indicator.create",
        },
        {
            href: "/profile.html",
            icon: "ME",
            labelKey: "quick.profile",
            hintKey: "quick.account_tools",
            indicatorKey: "quick.indicator.manage",
        },
    ],
};

let currentLanguage = DEFAULT_LANGUAGE;
let currentTheme = "system";

let currentUserPromise = null;

function t(key, vars = {}) {
    const table = TRANSLATIONS[currentLanguage] || TRANSLATIONS[DEFAULT_LANGUAGE] || {};
    const fallbackTable = TRANSLATIONS[DEFAULT_LANGUAGE] || {};
    const template = table[key] || fallbackTable[key] || key;
    return template.replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? `{${name}}`));
}

function detectLanguageFromBrowser() {
    const preferred = Array.isArray(window.navigator.languages)
        ? window.navigator.languages
        : [window.navigator.language];
    const hasFrench = preferred.some((lang) => String(lang || "").toLowerCase().startsWith("fr"));
    return hasFrench ? "fr" : DEFAULT_LANGUAGE;
}

function resolveInitialLanguage() {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && SUPPORTED_LANGUAGES.has(stored)) {
        return stored;
    }
    return detectLanguageFromBrowser();
}

function resolveInitialTheme() {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && SUPPORTED_THEMES.has(stored)) {
        return stored;
    }
    return "system";
}

function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getResolvedTheme(themeChoice = currentTheme) {
    const choice = SUPPORTED_THEMES.has(themeChoice) ? themeChoice : "system";
    return choice === "system" ? getSystemTheme() : choice;
}

function getThemeToggleLabel() {
    return getResolvedTheme() === "dark"
        ? t("theme.switch_to_light")
        : t("theme.switch_to_dark");
}

function getNextLanguage() {
    return currentLanguage === "fr" ? "en" : "fr";
}

function getLanguageToggleLabel() {
    return currentLanguage === "fr"
        ? t("preferences.switch_to_english")
        : t("preferences.switch_to_french");
}

function renderLanguageToggleControl() {
    const label = escapeHtml(getLanguageToggleLabel());
    return `
        <button
            type="button"
            class="language-toggle"
            data-language-toggle
            aria-label="${label}"
            title="${label}"
        >${escapeHtml(currentLanguage.toUpperCase())}</button>
    `;
}

function syncLanguageToggleButtons(root = document) {
    const label = getLanguageToggleLabel();
    const shortLabel = currentLanguage.toUpperCase();
    root.querySelectorAll("[data-language-toggle]").forEach((button) => {
        button.textContent = shortLabel;
        button.setAttribute("aria-label", label);
        button.setAttribute("title", label);
    });
}

function initLanguageToggles(root = document) {
    root.querySelectorAll("[data-language-toggle]").forEach((button) => {
        if (button.dataset.languageToggleBound === "true") {
            return;
        }
        button.dataset.languageToggleBound = "true";
        button.addEventListener("click", () => {
            setLanguage(getNextLanguage());
        });
    });
    syncLanguageToggleButtons(root);
}

function renderThemeToggleControl() {
    const label = escapeHtml(getThemeToggleLabel());
    return `
        <button
            type="button"
            class="theme-icon-toggle"
            data-theme-toggle
            aria-label="${label}"
            title="${label}"
        >
            <span class="theme-icon theme-icon-sun" aria-hidden="true">☀</span>
            <span class="theme-icon theme-icon-moon" aria-hidden="true">☾</span>
        </button>
    `;
}

function syncThemeToggleButtons(root = document) {
    const resolved = getResolvedTheme();
    const label = getThemeToggleLabel();
    root.querySelectorAll("[data-theme-toggle]").forEach((button) => {
        button.dataset.resolvedTheme = resolved;
        button.setAttribute("aria-label", label);
        button.setAttribute("title", label);
    });
}

function initThemeToggles(root = document) {
    root.querySelectorAll("[data-theme-toggle]").forEach((button) => {
        if (button.dataset.themeToggleBound === "true") {
            return;
        }
        button.dataset.themeToggleBound = "true";
        button.addEventListener("click", () => {
            const nextTheme = getResolvedTheme() === "dark" ? "light" : "dark";
            applyTheme(nextTheme);
        });
    });
    syncThemeToggleButtons(root);
}

function applyTheme(themeChoice, { persist = true } = {}) {
    currentTheme = SUPPORTED_THEMES.has(themeChoice) ? themeChoice : "system";
    const resolved = getResolvedTheme(currentTheme);
    document.documentElement.dataset.theme = resolved;
    if (persist) {
        window.localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
    }
    syncThemeToggleButtons(document);
}

function setLanguage(lang, { persist = true } = {}) {
    currentLanguage = SUPPORTED_LANGUAGES.has(lang) ? lang : DEFAULT_LANGUAGE;
    if (persist) {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
    }
    const languageSelect = document.getElementById("language-select");
    if (languageSelect && languageSelect.value !== currentLanguage) {
        languageSelect.value = currentLanguage;
    }
    document.documentElement.lang = currentLanguage;
    syncLanguageToggleButtons(document);
    applyTranslations(document);
    updateDocumentTitle();
    void refreshLocalizedDynamicUi();
}

function applyTranslations(root = document) {
    root.querySelectorAll("[data-i18n]").forEach((element) => {
        element.textContent = t(element.dataset.i18n);
    });
    root.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
        element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
    });
    root.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
        element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
    });
    root.querySelectorAll("[data-i18n-label]").forEach((element) => {
        element.setAttribute("label", t(element.dataset.i18nLabel));
    });
}

function updateDocumentTitle() {
    const page = document.body.dataset.page || "index";
    const title = t(`page.title.${page}`);
    document.title = `${title} | HBnB`;
}

function initLanguageControl() {
    initLanguageToggles(document);

    const languageSelect = document.getElementById("language-select");
    if (!languageSelect) {
        return;
    }
    languageSelect.value = currentLanguage;
    languageSelect.addEventListener("change", (event) => {
        setLanguage(event.target.value);
    });
}

function initThemeControl() {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const updateFromSystem = () => {
        if (currentTheme === "system") {
            applyTheme("system", { persist: false });
        }
    };
    if (typeof media.addEventListener === "function") {
        media.addEventListener("change", updateFromSystem);
    } else if (typeof media.addListener === "function") {
        media.addListener(updateFromSystem);
    }
}

function initUserPreferences() {
    currentLanguage = resolveInitialLanguage();
    currentTheme = resolveInitialTheme();
    applyTheme(currentTheme, { persist: false });
    initLanguageControl();
    initThemeControl();
    setLanguage(currentLanguage, { persist: false });
}

async function refreshLocalizedDynamicUi() {
    await initAuthActions();

    const page = document.body.dataset.page;
    if (page === "index") {
        await hydrateIndexQuickActions();
    } else if (page === "place") {
        const placeId = new URLSearchParams(window.location.search).get("id");
        updateReviewAction(placeId);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initUserPreferences();

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
    } else if (page === "data-rights") {
        void initDataRightsPage();
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
        updateApiDocsVisibility(null);
        return;
    }

    const user = await loadCurrentUser();
    if (!user) {
        renderGuestAuth(container);
        updateApiDocsVisibility(null);
        return;
    }
    renderUserAuth(container, user);
    updateApiDocsVisibility(user);
}

function updateApiDocsVisibility(user) {
    const apiDocsLink = document.getElementById("nav-api-docs");
    if (!apiDocsLink) {
        return;
    }
    apiDocsLink.classList.toggle("hidden", !Boolean(user && user.is_admin));
}

function renderGuestAuth(container) {
    container.innerHTML = `
        <div class="auth-cluster auth-cluster-guest">
            <a class="utility-link" href="/signup.html">${escapeHtml(t("auth.sign_up"))}</a>
            <a href="/login.html" class="login-button" id="auth-link">${escapeHtml(t("auth.login"))}</a>
            <div class="auth-preferences">
                ${renderLanguageToggleControl()}
                ${renderThemeToggleControl()}
            </div>
        </div>
    `;
    initLanguageToggles(container);
    initThemeToggles(container);
}

function renderUserAuth(container, user) {
    const label = escapeHtml(getUserLabel(user));
    const avatar = escapeHtml(getUserAvatar(user));

    container.innerHTML = `
        <div class="auth-cluster">
            <div class="auth-shortcuts">
                <a class="utility-link" href="/add_place.html">${escapeHtml(t("auth.new_place"))}</a>
            </div>
            <div class="profile-controls">
                <div class="profile-menu" data-profile-menu>
                    <button
                        type="button"
                        class="profile-chip profile-chip-button"
                        aria-label="${escapeHtml(t("auth.open_account_menu"))}"
                        aria-haspopup="menu"
                        aria-expanded="false"
                        data-profile-toggle
                    >
                        <img class="user-avatar" src="${avatar}" alt="${escapeHtml(t("profile.avatar_alt", { name: getUserLabel(user) }))}">
                        <span class="profile-meta">
                            <span class="profile-label">${escapeHtml(t("auth.connected"))}</span>
                            <span class="profile-name">${label}</span>
                        </span>
                        <span class="profile-caret" aria-hidden="true">▾</span>
                    </button>
                    <div class="profile-dropdown" role="menu" data-profile-dropdown>
                        <a class="profile-menu-item" href="/profile.html" role="menuitem">${escapeHtml(t("auth.profile"))}</a>
                        <a class="profile-menu-item" href="/settings.html" role="menuitem">${escapeHtml(t("auth.settings"))}</a>
                        <a class="profile-menu-item" href="/data-rights.html" role="menuitem">${escapeHtml(t("auth.data_rights"))}</a>
                        <button type="button" class="profile-menu-item profile-menu-item-danger" role="menuitem" data-logout-action>${escapeHtml(t("auth.logout"))}</button>
                    </div>
                </div>
                <div class="profile-tools">
                    ${renderLanguageToggleControl()}
                    ${renderThemeToggleControl()}
                </div>
            </div>
        </div>
    `;

    initLanguageToggles(container);
    initThemeToggles(container);
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
        message.textContent = t("login.message.registered");
    } else if (params.get("session") === "expired") {
        message.textContent = t("login.message.session_expired");
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        message.textContent = t("login.message.signing_in");

        const email = form.email.value.trim();
        const password = form.password.value;

        try {
            const data = await fetchJson("/api/v1/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });

            setToken(data.access_token);
            message.textContent = t("login.message.success");

            const next = new URLSearchParams(window.location.search).get("next");
            window.setTimeout(() => {
                window.location.href = next || "/index.html";
            }, 500);
        } catch (error) {
            message.textContent = error.message || t("login.message.error");
        }
    });
}

async function initIndexPage() {
    const grid = document.getElementById("places-grid");
    const quickActionsPromise = hydrateIndexQuickActions();

    if (!grid) {
        await quickActionsPromise;
        return;
    }

    const [places] = await Promise.all([
        loadPlaces(),
        quickActionsPromise,
    ]);
    grid.innerHTML = "";

    places.forEach((place) => {
        grid.appendChild(createPlaceCardElement(place));
    });
}

async function hydrateIndexQuickActions() {
    const panel = document.querySelector("[data-quick-actions]");
    const grid = document.querySelector("[data-quick-actions-grid]");
    const mode = document.querySelector("[data-quick-actions-mode]");
    if (!panel || !grid || !mode) {
        return;
    }

    let state = "guest";
    if (getToken()) {
        const user = await loadCurrentUser();
        if (user) {
            state = "member";
        }
    }

    panel.dataset.quickActionsState = state;
    mode.textContent = state === "member"
        ? t("index.quick_actions.mode_member")
        : t("index.quick_actions.mode_guest");
    grid.innerHTML = renderQuickActionCards(INDEX_QUICK_ACTIONS[state] || INDEX_QUICK_ACTIONS.guest);
}

function renderQuickActionCards(actions) {
    return actions.map((action) => `
        <a class="quick-action-card" href="${escapeHtml(action.href)}" role="listitem">
            <span class="quick-action-icon" aria-hidden="true">${escapeHtml(action.icon)}</span>
            <span class="quick-action-copy">
                <strong>${escapeHtml(t(action.labelKey))}</strong>
                <span>${escapeHtml(t(action.hintKey))}</span>
            </span>
            <span class="quick-action-indicator" aria-hidden="true">${escapeHtml(t(action.indicatorKey))}</span>
        </a>
    `).join("");
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
    const text = document.getElementById("text");
    const placeError = document.getElementById("review-place-error");
    const ratingError = document.getElementById("review-rating-error");
    const textError = document.getElementById("review-text-error");

    if (!form || !message || !authRequired || !select || !rating || !text || !placeError || !ratingError || !textError) {
        return;
    }

    select.required = true;
    rating.required = true;
    const fieldBindings = {
        place_id: {
            label: t("common.place"),
            errorElement: placeError,
            inputs: [select],
            focusTarget: select,
        },
        rating: {
            label: t("common.rating"),
            errorElement: ratingError,
            inputs: [rating],
            focusTarget: rating,
        },
        text: {
            label: t("common.comment"),
            errorElement: textError,
            inputs: [text],
            focusTarget: text,
        },
    };

    const places = await loadApiPlaces();
    const requestedPlaceId = new URLSearchParams(window.location.search).get("place_id");
    const selectedPlace = places.find((place) => place.id === requestedPlaceId);

    select.innerHTML = "";
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = t("common.choose_place");
    placeholder.selected = !selectedPlace;
    select.appendChild(placeholder);

    places.forEach((place) => {
        const option = document.createElement("option");
        option.value = place.id;
        option.textContent = `${place.title} · ${formatPrice(place.price)} ${t("common.per_night")}`;
        if (selectedPlace && requestedPlaceId === place.id) {
            option.selected = true;
            placeholder.selected = false;
        }
        select.appendChild(option);
    });

    if (!token) {
        authRequired.classList.remove("hidden");
        authRequired.innerHTML = t("review.message.login_required", {
            next: encodeURIComponent(window.location.pathname + window.location.search),
        });
        form.classList.add("hidden");
        return;
    }

    if (!places.length) {
        authRequired.classList.remove("hidden");
        authRequired.textContent = t("review.message.no_real_places");
        form.classList.add("hidden");
        return;
    }

    if (requestedPlaceId && !selectedPlace) {
        authRequired.classList.remove("hidden");
        authRequired.textContent = t("review.message.demo_selected");
    }

    const clearReviewErrors = () => {
        Object.values(fieldBindings).forEach((binding) => {
            binding.errorElement.textContent = "";
            binding.inputs.forEach((input) => input.setAttribute("aria-invalid", "false"));
        });
    };

    const applyReviewErrors = (fields, fallbackMessage = null) => {
        clearReviewErrors();
        const labels = [];
        let firstFocusTarget = null;

        Object.entries(fields || {}).forEach(([fieldName, errorMessage]) => {
            const binding = fieldBindings[fieldName];
            if (!binding || !errorMessage) {
                return;
            }
            binding.errorElement.textContent = errorMessage;
            binding.inputs.forEach((input) => input.setAttribute("aria-invalid", "true"));
            labels.push(binding.label);
            if (!firstFocusTarget) {
                firstFocusTarget = binding.focusTarget;
            }
        });

        if (labels.length) {
            setFormMessage(
                message,
                t("form.fix_fields", { fields: Array.from(new Set(labels)).join(", ") }),
                "error",
                { scroll: true },
            );
        } else if (fallbackMessage) {
            setFormMessage(message, fallbackMessage, "error", { scroll: true });
        }

        firstFocusTarget?.focus?.();
    };

    const validateReviewForm = () => {
        const fields = {};
        const trimmedText = text.value.trim();
        const numericRating = Number(rating.value);

        if (!select.value) {
            fields.place_id = t("form.required_place");
        }
        if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
            fields.rating = t("form.required_rating");
        }
        if (!trimmedText) {
            fields.text = t("form.required_comment");
        } else if (trimmedText.length > 500) {
            fields.text = t("form.comment_max");
        }

        return {
            isValid: !Object.keys(fields).length,
            fields,
            values: {
                place_id: select.value,
                rating: numericRating,
                text: trimmedText,
            },
        };
    };

    select.addEventListener("change", () => {
        clearReviewErrors();
        clearFormMessage(message);
    });
    rating.addEventListener("change", () => {
        clearReviewErrors();
        clearFormMessage(message);
    });
    text.addEventListener("input", () => {
        clearReviewErrors();
        clearFormMessage(message);
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        clearReviewErrors();
        clearFormMessage(message);

        const validation = validateReviewForm();
        if (!validation.isValid) {
            applyReviewErrors(validation.fields);
            return;
        }

        setFormMessage(message, t("review.message.publishing"), "info", { scroll: true });

        try {
            await fetchJson("/api/v1/reviews/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(validation.values),
            });

            setFormMessage(message, t("review.message.success"), "success", { scroll: true });
            window.setTimeout(() => {
                window.location.href = `/place.html?id=${encodeURIComponent(validation.values.place_id)}`;
            }, 700);
        } catch (error) {
            applyReviewErrors(error.fields, error.message || t("review.message.error"));
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
            t("add_place.guest_required"),
            window.location.pathname,
        );
        form.classList.add("hidden");
        return;
    }

    try {
        let isSubmitting = false;
        const fieldBindings = {
            title: {
                label: t("common.title"),
                errorElement: titleError,
                inputs: [titleInput],
                focusTarget: titleInput,
            },
            price: {
                label: t("common.price"),
                errorElement: priceError,
                inputs: [priceInput],
                focusTarget: priceInput,
            },
            phone_number: {
                label: t("add_place.phone_number"),
                errorElement: phoneError,
                inputs: [phoneCountrySelect, phoneLocalNumberInput],
                focusTarget: phoneLocalNumberInput,
            },
            photos: {
                label: t("add_place.photos"),
                errorElement: photosError,
                inputs: [imageInput],
                focusTarget: imageInput,
            },
            location: {
                label: t("add_place.map_location"),
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
                addressSearchStatus.textContent = t("add_place.address_prompt");
                addressSearchResults.classList.add("hidden");
                return;
            }

            addressSearchStatus.textContent = t("add_place.searching_address");

            try {
                const results = await searchAddress(query);
                if (!results.length) {
                    addressSearchStatus.textContent = t("add_place.no_address_found");
                    addressSearchResults.classList.add("hidden");
                    return;
                }

                addressSearchResults.classList.remove("hidden");
                addressSearchStatus.textContent = t("add_place.choose_address_result");

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
                        addressSearchStatus.textContent = t("add_place.address_selected");
                    });
                    addressSearchResults.appendChild(button);
                });
            } catch (error) {
                addressSearchStatus.textContent = t("add_place.address_search_unavailable");
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
                setFormMessage(message, t("add_place.creating"), "info", { scroll: true });
                submitButton.disabled = true;
                submitButton.textContent = t("add_place.creating_button");

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

                setFormMessage(message, t("add_place.created_success"), "success", { scroll: true });
                window.setTimeout(() => {
                    window.location.href = `/place.html?id=${encodeURIComponent(data.id)}`;
                }, 700);
            } catch (error) {
                console.error("Create Place submit failed:", error);
                if (error.fields && Object.keys(error.fields).length) {
                    applyPlaceFieldErrors(message, fieldBindings, error.fields, {
                        scroll: true,
                        fallbackMessage: error.message || t("form.validation_failed"),
                    });
                } else {
                    setFormMessage(message, error.message || t("add_place.create_error"), "error", { scroll: true });
                }
            } finally {
                isSubmitting = false;
                submitButton.disabled = false;
                submitButton.textContent = t("place.create_place");
            }
        });
    } catch (error) {
        console.error("Create Place page init failed:", error);
        submitButton.disabled = true;
        setFormMessage(
            message,
            t("add_place.init_error"),
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
            <strong>${escapeHtml(t("signup.banner.signed_in"))}</strong>
            <div class="banner-actions">
                <a class="utility-link" href="/index.html">${escapeHtml(t("signup.banner.browse_places"))}</a>
                <a class="login-button" href="/add_place.html">${escapeHtml(t("signup.banner.create_place"))}</a>
            </div>
        `;
        form.classList.add("hidden");
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        message.textContent = t("signup.message.creating");

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

            message.textContent = t("signup.message.success");
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
            message.textContent = error.message || t("signup.message.error");
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
            t("profile.guest_required"),
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
        email.textContent = user.email || t("profile.no_email");
        avatar.src = getUserAvatar(user);
        avatar.alt = t("profile.avatar_alt", { name: getUserLabel(user) });
        placeCount.textContent = String(places.length);
        role.textContent = user.is_admin ? t("role.admin") : t("role.member");

        placesGrid.innerHTML = "";
        const refreshOwnedPlacesState = () => {
            const cards = placesGrid.querySelectorAll(".place-card");
            placeCount.textContent = String(cards.length);

            if (cards.length) {
                emptyState.classList.add("hidden");
            } else {
                emptyState.classList.remove("hidden");
                emptyState.innerHTML = `
                    <strong>${escapeHtml(t("profile.empty.title"))}</strong>
                    <div class="banner-actions">
                        <a class="login-button" href="/add_place.html">${escapeHtml(t("profile.empty.action"))}</a>
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
                            feedback.textContent = t("profile.delete.pending");
                            deleteButton.disabled = true;
                        },
                        onSuccess: () => {
                            card.remove();
                            refreshOwnedPlacesState();
                            feedback.textContent = t("profile.delete.done");
                        },
                        onError: (error) => {
                            deleteButton.disabled = false;
                            feedback.textContent = error.message || t("profile.delete.error");
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
                <strong>${escapeHtml(t("profile.empty.title"))}</strong>
                <div class="banner-actions">
                    <a class="login-button" href="/add_place.html">${escapeHtml(t("profile.empty.action"))}</a>
                </div>
            `;
        }

        refreshOwnedPlacesState();
        content.classList.remove("hidden");
    } catch (error) {
        authRequired.classList.remove("hidden");
        authRequired.textContent = error.message || t("profile.load_error");
    }
}

async function initSettingsPage() {
    const token = getToken();
    const authRequired = document.getElementById("settings-auth-required");
    const settingsCard = document.getElementById("settings-card");
    const form = document.getElementById("settings-form");
    const photoForm = document.getElementById("settings-photo-form");
    const photoInput = document.getElementById("settings-photo-input");
    const photoUploadButton = document.getElementById("settings-photo-upload");
    const photoRemoveButton = document.getElementById("settings-photo-remove");
    const avatarPreview = document.getElementById("settings-avatar-preview");
    const message = document.getElementById("settings-message");
    const firstName = document.getElementById("settings-first-name");
    const lastName = document.getElementById("settings-last-name");

    if (
        !authRequired || !settingsCard || !form || !photoForm || !photoInput
        || !photoUploadButton || !photoRemoveButton || !avatarPreview
        || !message || !firstName || !lastName
    ) {
        return;
    }

    if (!token) {
        authRequired.classList.remove("hidden");
        authRequired.innerHTML = buildGuestAccessBanner(
            t("settings.guest_required"),
            window.location.pathname,
        );
        return;
    }

    let currentUser = null;
    const syncSettingsAvatarPreview = (user) => {
        avatarPreview.src = getUserAvatar(user);
        avatarPreview.alt = t("profile.avatar_alt", { name: getUserLabel(user) });
        photoRemoveButton.disabled = !Boolean(user?.profile_photo_url);
    };

    try {
        currentUser = await loadCurrentUser();
        if (!currentUser) {
            return;
        }
        firstName.value = currentUser.first_name || "";
        lastName.value = currentUser.last_name || "";
        syncSettingsAvatarPreview(currentUser);
        settingsCard.classList.remove("hidden");
    } catch (error) {
        authRequired.classList.remove("hidden");
        authRequired.textContent = error.message || t("settings.load_error");
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        setFormMessage(message, t("settings.message.saving"), "info");

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

            currentUser = updatedUser;
            cacheCurrentUser(updatedUser);
            syncVisibleAccountName(updatedUser);
            syncVisibleAccountAvatar(updatedUser);
            syncSettingsAvatarPreview(updatedUser);
            setFormMessage(message, t("settings.message.success"), "success");
        } catch (error) {
            setFormMessage(message, error.message || t("settings.save_error"), "error");
        }
    });

    photoForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const file = photoInput.files?.[0] || null;
        if (!file) {
            setFormMessage(message, t("settings.photo.no_file"), "error");
            return;
        }

        photoUploadButton.disabled = true;
        photoRemoveButton.disabled = true;
        setFormMessage(message, t("settings.photo.uploading"), "info");

        try {
            const formData = new FormData();
            formData.append("photo", file, file.name);
            const updatedUser = await fetchJson("/api/v1/users/me/photo", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            currentUser = updatedUser;
            cacheCurrentUser(updatedUser);
            syncVisibleAccountName(updatedUser);
            syncVisibleAccountAvatar(updatedUser);
            syncSettingsAvatarPreview(updatedUser);
            photoInput.value = "";
            setFormMessage(message, t("settings.photo.success"), "success");
        } catch (error) {
            setFormMessage(message, error.message || t("settings.photo.error"), "error");
        } finally {
            photoUploadButton.disabled = false;
            photoRemoveButton.disabled = !Boolean(currentUser?.profile_photo_url);
        }
    });

    photoRemoveButton.addEventListener("click", async () => {
        if (!currentUser?.profile_photo_url) {
            return;
        }

        photoUploadButton.disabled = true;
        photoRemoveButton.disabled = true;
        setFormMessage(message, t("settings.photo.remove_pending"), "info");

        try {
            const updatedUser = await fetchJson("/api/v1/users/me/photo", {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            currentUser = updatedUser;
            cacheCurrentUser(updatedUser);
            syncVisibleAccountName(updatedUser);
            syncVisibleAccountAvatar(updatedUser);
            syncSettingsAvatarPreview(updatedUser);
            photoInput.value = "";
            setFormMessage(message, t("settings.photo.remove_success"), "success");
        } catch (error) {
            setFormMessage(message, error.message || t("settings.photo.remove_error"), "error");
        } finally {
            photoUploadButton.disabled = false;
            photoRemoveButton.disabled = !Boolean(currentUser?.profile_photo_url);
        }
    });
}

function downloadPersonalDataExport(payload) {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const timestamp = new Date().toISOString().replaceAll(":", "-");
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `hbnb-personal-data-${timestamp}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.URL.revokeObjectURL(url);
}

async function initDataRightsPage() {
    const token = getToken();
    const authRequired = document.getElementById("rights-auth-required");
    const accountCard = document.getElementById("rights-account-card");
    const exportButton = document.getElementById("rights-export-button");
    const deleteButton = document.getElementById("rights-delete-button");
    const message = document.getElementById("rights-message");

    if (!authRequired || !accountCard || !exportButton || !deleteButton || !message) {
        return;
    }

    if (!token) {
        authRequired.classList.remove("hidden");
        authRequired.innerHTML = buildGuestAccessBanner(
            t("rights.guest_required"),
            window.location.pathname,
        );
        return;
    }

    try {
        const user = await loadCurrentUser();
        if (!user) {
            throw new Error(t("rights.load_error"));
        }
        accountCard.classList.remove("hidden");
    } catch (error) {
        authRequired.classList.remove("hidden");
        authRequired.textContent = error.message || t("rights.load_error");
        return;
    }

    exportButton.addEventListener("click", async () => {
        exportButton.disabled = true;
        deleteButton.disabled = true;
        setFormMessage(message, t("rights.export_pending"), "info");

        try {
            const payload = await fetchJson("/api/v1/users/me/export", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            downloadPersonalDataExport(payload);
            setFormMessage(message, t("rights.export_success"), "success");
        } catch (error) {
            setFormMessage(message, error.message || t("rights.export_error"), "error");
        } finally {
            if (getToken()) {
                exportButton.disabled = false;
                deleteButton.disabled = false;
            }
        }
    });

    deleteButton.addEventListener("click", async () => {
        if (!window.confirm(t("rights.delete_confirm"))) {
            return;
        }

        exportButton.disabled = true;
        deleteButton.disabled = true;
        setFormMessage(message, t("rights.delete_pending"), "info");

        try {
            await fetchJson("/api/v1/users/me", {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            clearToken();
            setFormMessage(message, t("rights.delete_success"), "success");
            window.setTimeout(() => {
                window.location.href = "/index.html";
            }, 800);
        } catch (error) {
            setFormMessage(message, error.message || t("rights.delete_error"), "error");
            exportButton.disabled = false;
            deleteButton.disabled = false;
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
        fields.title = t("form.title_required");
    } else if (title.length > 100) {
        fields.title = t("form.title_max");
    }

    if (!rawPriceValue) {
        fields.price = t("form.price_required");
    } else if (rawPriceValue !== rawPriceDigits) {
        fields.price = t("form.price_digits");
    } else if (!rawPriceDigits || rawPriceDigits.length > 7) {
        fields.price = t("form.price_digits");
    }

    if (!isValidLatitude(latitude) || !isValidLongitude(longitude)) {
        fields.location = t("form.location_required");
    }

    if (phoneLocalNumberInput.value.trim() && !phoneValidation.valid) {
        fields.phone_number = phoneValidation.message || t("form.phone_invalid");
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
            container.innerHTML = `<p class="amenity-picker-empty">${escapeHtml(t("amenity.none"))}</p>`;
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
            createFeedback.textContent = t("amenity.prompt_name");
            createInput.focus();
            return;
        }

        try {
            createButton.disabled = true;
            createFeedback.textContent = t("amenity.adding");
            const amenity = await fetchJson("/api/v1/amenities/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name }),
            });

            upsertAmenity(amenity, { select: true });
            createInput.value = "";
            createFeedback.textContent = t("amenity.ready");
            helper.textContent = t("add_place.amenities_help");
            createInput.focus();
        } catch (error) {
            createFeedback.textContent = error.message || t("amenity.add_error");
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
            helper.textContent = t("amenity.loading");
            createFeedback.textContent = "";

            try {
                const data = await fetchJson("/api/v1/amenities/");
                const payload = Array.isArray(data?.amenities) ? data.amenities : [];

                amenities.splice(0, amenities.length, ...payload.map((amenity) => ({
                    id: amenity.id,
                    name: amenity.name,
                })));

                helper.textContent = amenities.length
                    ? t("add_place.amenities_help")
                    : t("amenity.empty_catalog");
            } catch (error) {
                helper.textContent = t("amenity.load_error");
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
            selectedCoordinates.textContent = t("map.selected", {
                lat: Number(latitude).toFixed(4),
                lng: Number(longitude).toFixed(4),
            });
        } else {
            selectedCoordinates.textContent = t("add_place.no_location");
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
            ? t("map.hide_manual")
            : t("add_place.enter_coordinates");
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

        mapStatus.textContent = t("map.click_help");
    } else {
        showManualMode(true);
        mapStatus.textContent = t("map.unavailable");
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
                ${escapeHtml(t("place.delete_place"))}
            </button>
        `;
        article.appendChild(actions);
    }

    return article;
}

function buildPlaceCardMarkup(place) {
    return `
        <a class="place-card-link" href="/place.html?id=${encodeURIComponent(place.id)}" aria-label="${escapeHtml(t("place.view_details_for", { title: place.title }))}">
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
                <p class="price-tag">${formatPrice(place.price)} ${escapeHtml(t("common.per_night"))}</p>
                <p class="card-description">${escapeHtml(place.description)}</p>
                <div class="card-host">
                    <img class="user-avatar" src="${escapeHtml(getUserAvatar(place.host))}" alt="${escapeHtml(place.hostName)} avatar">
                    <span>${escapeHtml(t("place.hosted_by", { host: place.hostName }))}</span>
                </div>
                <span class="details-button">${escapeHtml(t("place.view_details"))}</span>
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

function syncVisibleAccountAvatar(user) {
    const avatarUrl = getUserAvatar(user);
    const avatarAlt = t("profile.avatar_alt", { name: getUserLabel(user) });
    document.querySelectorAll(".profile-chip .user-avatar").forEach((element) => {
        element.src = avatarUrl;
        element.alt = avatarAlt;
    });
    const profileAvatar = document.getElementById("profile-avatar");
    if (profileAvatar) {
        profileAvatar.src = avatarUrl;
        profileAvatar.alt = avatarAlt;
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
                actionMessage.textContent = t("profile.delete.pending");
            },
            onSuccess: () => {
                actionMessage.textContent = t("place.delete.redirect");
                window.setTimeout(() => {
                    window.location.href = "/profile.html";
                }, 500);
            },
            onError: (error) => {
                deleteButton.disabled = false;
                actionMessage.textContent = error.message || t("profile.delete.error");
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
    if (!window.confirm(t("place.delete.confirm"))) {
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
    const galleryRow = document.getElementById("place-gallery-row");
    const galleryPrev = document.getElementById("place-gallery-prev");
    const galleryNext = document.getElementById("place-gallery-next");

    if (
        !title || !price || !host || !hostAvatar || !location || !phoneCard || !phoneLink
        || !description || !tag || !amenities || !image || !gallery || !galleryRow || !galleryPrev || !galleryNext
    ) {
        return;
    }

    title.textContent = place.title;
    price.textContent = `${formatPrice(place.price)} ${t("common.per_night")}`;
    host.textContent = place.hostName || t("place.default_host");
    hostAvatar.src = getUserAvatar(place.host);
    hostAvatar.alt = `${place.hostName || t("place.host")} avatar`;
    location.textContent = place.location || t("place.default_location");
    description.textContent = place.description;
    tag.textContent = place.tag || t("place.default_tag");
    renderPlaceGallery({
        imageElement: image,
        galleryElement: gallery,
        galleryRowElement: galleryRow,
        previousButton: galleryPrev,
        nextButton: galleryNext,
        place,
    });

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

function renderPlaceGallery({
    imageElement,
    galleryElement,
    galleryRowElement,
    previousButton,
    nextButton,
    place,
}) {
    const photos = Array.isArray(place.photos) && place.photos.length
        ? place.photos
        : [{
            image_url: place.image,
            position: 0,
            imagePosition: place.imagePosition || "50% 50%",
        }];
    let activeIndex = 0;

    const setActivePhoto = (nextIndex) => {
        activeIndex = ((nextIndex % photos.length) + photos.length) % photos.length;
        const photo = photos[activeIndex];
        imageElement.src = photo.image_url;
        imageElement.alt = `${place.title} interior`;
        imageElement.style.objectPosition = photo.imagePosition || place.imagePosition || "50% 50%";
        galleryElement.querySelectorAll("[data-photo-position]").forEach((button) => {
            button.classList.toggle("is-active", Number(button.dataset.photoIndex) === activeIndex);
        });
        const activeButton = galleryElement.querySelector(`[data-photo-index="${activeIndex}"]`);
        activeButton?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
        });
    };

    galleryElement.innerHTML = "";

    if (photos.length <= 1) {
        galleryElement.classList.add("hidden");
        galleryRowElement.classList.add("hidden");
        previousButton.classList.add("hidden");
        nextButton.classList.add("hidden");
        imageElement.src = photos[0].image_url;
        imageElement.alt = `${place.title} interior`;
        imageElement.style.objectPosition = photos[0].imagePosition || place.imagePosition || "50% 50%";
        return;
    }

    galleryElement.classList.remove("hidden");
    galleryRowElement.classList.remove("hidden");
    previousButton.classList.remove("hidden");
    nextButton.classList.remove("hidden");

    photos.forEach((photo, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "place-gallery-thumb";
        button.dataset.photoIndex = String(index);
        button.innerHTML = `
            <img src="${escapeHtml(photo.image_url)}" alt="${escapeHtml(place.title)} thumbnail ${index + 1}">
        `;
        button.addEventListener("click", () => {
            setActivePhoto(index);
        });
        galleryElement.appendChild(button);
    });

    previousButton.onclick = () => {
        setActivePhoto(activeIndex - 1);
    };
    nextButton.onclick = () => {
        setActivePhoto(activeIndex + 1);
    };
    galleryElement.onwheel = (event) => {
        if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
            galleryElement.scrollLeft += event.deltaY;
            event.preventDefault();
        }
    };
    setActivePhoto(0);
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
                        <img class="user-avatar review-avatar" src="${escapeHtml(getUserAvatar({ userName: t("reviews.guest") }))}" alt="${escapeHtml(t("reviews.guest_avatar"))}">
                        <strong>${escapeHtml(t("reviews.empty.title"))}</strong>
                    </div>
                    <span class="review-rating">${escapeHtml(t("reviews.empty.cta"))}</span>
                </div>
                <p>${escapeHtml(t("reviews.empty.text"))}</p>
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
        action.textContent = isDemoPlace ? t("place.action.review_real") : t("place.action.add_review");
        action.href = isDemoPlace
            ? "/add_review.html"
            : `/add_review.html?place_id=${encodeURIComponent(placeId)}`;
    } else {
        const next = isDemoPlace
            ? "/add_review.html"
            : `/add_review.html?place_id=${placeId}`;
        action.textContent = isDemoPlace ? t("place.action.login_review_real") : t("place.action.login_add_review");
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
        description: place.description || media.description || t("place.default_description"),
        location: place.location || formatLocation(place, media.location),
        host: owner,
        hostName: getUserLabel(owner) || media.hostName || t("place.default_host"),
        image: photos[0]?.image_url || place.image_url || place.image || media.image,
        photos,
        imagePosition: place.imagePosition || media.imagePosition || "50% 50%",
        phoneNumber: place.phone_number || place.phoneNumber || null,
        phoneCountryIso: place.phone_country_iso || place.phoneCountryIso || null,
        customAmenities,
        tag: place.tag || media.tag || mergedAmenities[0] || t("place.default_tag"),
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
    const profilePhoto = String(user?.profile_photo_url || "").trim();
    if (profilePhoto && /^\/static\/[a-zA-Z0-9/_\-.]+$/.test(profilePhoto)) {
        return profilePhoto;
    }
    return DEFAULT_AVATAR_URL;
}

function getUserLabel(user) {
    if (!user) {
        return t("profile.account");
    }

    if (user.userName) {
        return user.userName;
    }

    const firstName = user.first_name || "";
    const lastName = user.last_name || "";
    const fullName = `${firstName} ${lastName}`.trim();
    return fullName || user.email || t("profile.account");
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
            <a class="utility-link" href="${signupHref}">${escapeHtml(t("guest_banner.sign_up"))}</a>
            <a class="login-button" href="${loginHref}">${escapeHtml(t("guest_banner.login"))}</a>
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

    return fallback || t("place.default_location");
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
        const message = payload.error || payload.message || t("error.request_failed");
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
        throw new Error(t("error.address_search_failed"));
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
