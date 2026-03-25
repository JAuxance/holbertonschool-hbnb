PHONE_COUNTRY_BASE = [
    ("AR", "Argentina", "+54"),
    ("AU", "Australia", "+61"),
    ("AT", "Austria", "+43"),
    ("BE", "Belgium", "+32"),
    ("BR", "Brazil", "+55"),
    ("BG", "Bulgaria", "+359"),
    ("CA", "Canada", "+1"),
    ("CL", "Chile", "+56"),
    ("CN", "China", "+86"),
    ("CO", "Colombia", "+57"),
    ("CR", "Costa Rica", "+506"),
    ("HR", "Croatia", "+385"),
    ("CY", "Cyprus", "+357"),
    ("CZ", "Czech Republic", "+420"),
    ("DK", "Denmark", "+45"),
    ("DO", "Dominican Republic", "+1"),
    ("EG", "Egypt", "+20"),
    ("EE", "Estonia", "+372"),
    ("FI", "Finland", "+358"),
    ("FR", "France", "+33"),
    ("DE", "Germany", "+49"),
    ("GH", "Ghana", "+233"),
    ("GR", "Greece", "+30"),
    ("HK", "Hong Kong", "+852"),
    ("HU", "Hungary", "+36"),
    ("IS", "Iceland", "+354"),
    ("IN", "India", "+91"),
    ("ID", "Indonesia", "+62"),
    ("IE", "Ireland", "+353"),
    ("IL", "Israel", "+972"),
    ("IT", "Italy", "+39"),
    ("JP", "Japan", "+81"),
    ("KE", "Kenya", "+254"),
    ("LV", "Latvia", "+371"),
    ("LB", "Lebanon", "+961"),
    ("LT", "Lithuania", "+370"),
    ("LU", "Luxembourg", "+352"),
    ("MY", "Malaysia", "+60"),
    ("MT", "Malta", "+356"),
    ("MX", "Mexico", "+52"),
    ("MA", "Morocco", "+212"),
    ("NL", "Netherlands", "+31"),
    ("NZ", "New Zealand", "+64"),
    ("NG", "Nigeria", "+234"),
    ("NO", "Norway", "+47"),
    ("PK", "Pakistan", "+92"),
    ("PA", "Panama", "+507"),
    ("PE", "Peru", "+51"),
    ("PH", "Philippines", "+63"),
    ("PL", "Poland", "+48"),
    ("PT", "Portugal", "+351"),
    ("PR", "Puerto Rico", "+1"),
    ("QA", "Qatar", "+974"),
    ("RO", "Romania", "+40"),
    ("SA", "Saudi Arabia", "+966"),
    ("RS", "Serbia", "+381"),
    ("SG", "Singapore", "+65"),
    ("SK", "Slovakia", "+421"),
    ("SI", "Slovenia", "+386"),
    ("ZA", "South Africa", "+27"),
    ("KR", "South Korea", "+82"),
    ("ES", "Spain", "+34"),
    ("SE", "Sweden", "+46"),
    ("CH", "Switzerland", "+41"),
    ("TW", "Taiwan", "+886"),
    ("TH", "Thailand", "+66"),
    ("TN", "Tunisia", "+216"),
    ("TR", "Turkey", "+90"),
    ("UA", "Ukraine", "+380"),
    ("AE", "United Arab Emirates", "+971"),
    ("GB", "United Kingdom", "+44"),
    ("US", "United States", "+1"),
    ("UY", "Uruguay", "+598"),
    ("VE", "Venezuela", "+58"),
    ("VN", "Vietnam", "+84"),
]

DEFAULT_PHONE_COUNTRY = "FR"
DEFAULT_PHONE_RULE = {
    "localDigitsMin": 8,
    "localDigitsMax": 10,
    "stripLeadingZero": False,
    "example": "",
}

PHONE_RULE_OVERRIDES = {
    "AR": {"localDigitsMin": 10, "localDigitsMax": 10, "stripLeadingZero": True, "example": "11 2345 6789"},
    "AU": {"localDigitsMin": 9, "localDigitsMax": 9, "stripLeadingZero": True, "example": "412 345 678"},
    "AT": {"localDigitsMin": 10, "localDigitsMax": 13, "stripLeadingZero": True, "example": "660 1234567"},
    "BE": {"localDigitsMin": 8, "localDigitsMax": 9, "stripLeadingZero": True, "example": "470 12 34 56"},
    "BR": {"localDigitsMin": 10, "localDigitsMax": 11, "stripLeadingZero": True, "example": "11 91234 5678"},
    "BG": {"localDigitsMin": 8, "localDigitsMax": 9, "stripLeadingZero": True, "example": "88 123 4567"},
    "CA": {"localDigitsMin": 10, "localDigitsMax": 10, "stripLeadingZero": False, "example": "416 555 0198"},
    "CL": {"localDigitsMin": 9, "localDigitsMax": 9, "stripLeadingZero": True, "example": "9 8765 4321"},
    "CN": {"localDigitsMin": 11, "localDigitsMax": 11, "stripLeadingZero": False, "example": "138 0013 8000"},
    "CO": {"localDigitsMin": 10, "localDigitsMax": 10, "stripLeadingZero": False, "example": "300 123 4567"},
    "CR": {"localDigitsMin": 8, "localDigitsMax": 8, "stripLeadingZero": False, "example": "6000 1234"},
    "CY": {"localDigitsMin": 8, "localDigitsMax": 8, "stripLeadingZero": False, "example": "96 123456"},
    "CZ": {"localDigitsMin": 9, "localDigitsMax": 9, "stripLeadingZero": False, "example": "601 123 456"},
    "DE": {"localDigitsMin": 10, "localDigitsMax": 11, "stripLeadingZero": True, "example": "1512 3456789"},
    "DK": {"localDigitsMin": 8, "localDigitsMax": 8, "stripLeadingZero": False, "example": "20 12 34 56"},
    "DO": {"localDigitsMin": 10, "localDigitsMax": 10, "stripLeadingZero": False, "example": "809 555 0198"},
    "EE": {"localDigitsMin": 7, "localDigitsMax": 8, "stripLeadingZero": False, "example": "5123 4567"},
    "EG": {"localDigitsMin": 10, "localDigitsMax": 10, "stripLeadingZero": True, "example": "10 1234 5678"},
    "ES": {"localDigitsMin": 9, "localDigitsMax": 9, "stripLeadingZero": False, "example": "612 34 56 78"},
    "FI": {"localDigitsMin": 9, "localDigitsMax": 10, "stripLeadingZero": True, "example": "40 123 4567"},
    "FR": {"localDigitsMin": 9, "localDigitsMax": 9, "stripLeadingZero": True, "example": "6 12 34 56 78"},
    "GB": {"localDigitsMin": 10, "localDigitsMax": 10, "stripLeadingZero": True, "example": "7400 123456"},
    "GH": {"localDigitsMin": 9, "localDigitsMax": 9, "stripLeadingZero": True, "example": "24 123 4567"},
    "GR": {"localDigitsMin": 10, "localDigitsMax": 10, "stripLeadingZero": False, "example": "691 234 5678"},
    "HK": {"localDigitsMin": 8, "localDigitsMax": 8, "stripLeadingZero": False, "example": "5123 4567"},
    "HR": {"localDigitsMin": 8, "localDigitsMax": 9, "stripLeadingZero": True, "example": "91 234 5678"},
    "HU": {"localDigitsMin": 8, "localDigitsMax": 9, "stripLeadingZero": True, "example": "20 123 4567"},
    "IE": {"localDigitsMin": 9, "localDigitsMax": 9, "stripLeadingZero": True, "example": "85 123 4567"},
    "IL": {"localDigitsMin": 9, "localDigitsMax": 9, "stripLeadingZero": True, "example": "52 123 4567"},
    "IN": {"localDigitsMin": 10, "localDigitsMax": 10, "stripLeadingZero": False, "example": "98765 43210"},
    "IS": {"localDigitsMin": 7, "localDigitsMax": 7, "stripLeadingZero": False, "example": "611 1234"},
    "IT": {"localDigitsMin": 9, "localDigitsMax": 10, "stripLeadingZero": False, "example": "312 345 6789"},
    "JP": {"localDigitsMin": 10, "localDigitsMax": 10, "stripLeadingZero": True, "example": "90 1234 5678"},
    "KE": {"localDigitsMin": 9, "localDigitsMax": 9, "stripLeadingZero": True, "example": "712 345678"},
    "LB": {"localDigitsMin": 7, "localDigitsMax": 8, "stripLeadingZero": True, "example": "71 234 567"},
    "LT": {"localDigitsMin": 8, "localDigitsMax": 8, "stripLeadingZero": True, "example": "612 34567"},
    "LU": {"localDigitsMin": 8, "localDigitsMax": 9, "stripLeadingZero": False, "example": "621 123 456"},
    "LV": {"localDigitsMin": 8, "localDigitsMax": 8, "stripLeadingZero": False, "example": "2123 4567"},
    "MA": {"localDigitsMin": 9, "localDigitsMax": 9, "stripLeadingZero": True, "example": "612 345678"},
    "MT": {"localDigitsMin": 8, "localDigitsMax": 8, "stripLeadingZero": False, "example": "9912 3456"},
    "MX": {"localDigitsMin": 10, "localDigitsMax": 10, "stripLeadingZero": False, "example": "55 1234 5678"},
    "MY": {"localDigitsMin": 9, "localDigitsMax": 10, "stripLeadingZero": True, "example": "12 345 6789"},
    "NG": {"localDigitsMin": 10, "localDigitsMax": 10, "stripLeadingZero": True, "example": "803 123 4567"},
    "NL": {"localDigitsMin": 9, "localDigitsMax": 9, "stripLeadingZero": True, "example": "6 12345678"},
    "NO": {"localDigitsMin": 8, "localDigitsMax": 8, "stripLeadingZero": False, "example": "406 12 345"},
    "NZ": {"localDigitsMin": 8, "localDigitsMax": 10, "stripLeadingZero": True, "example": "21 123 4567"},
    "PA": {"localDigitsMin": 8, "localDigitsMax": 8, "stripLeadingZero": False, "example": "6123 4567"},
    "PE": {"localDigitsMin": 9, "localDigitsMax": 9, "stripLeadingZero": False, "example": "912 345 678"},
    "PH": {"localDigitsMin": 10, "localDigitsMax": 10, "stripLeadingZero": True, "example": "917 123 4567"},
    "PK": {"localDigitsMin": 10, "localDigitsMax": 10, "stripLeadingZero": True, "example": "300 1234567"},
    "PL": {"localDigitsMin": 9, "localDigitsMax": 9, "stripLeadingZero": False, "example": "512 345 678"},
    "PR": {"localDigitsMin": 10, "localDigitsMax": 10, "stripLeadingZero": False, "example": "787 555 0198"},
    "PT": {"localDigitsMin": 9, "localDigitsMax": 9, "stripLeadingZero": False, "example": "912 345 678"},
    "QA": {"localDigitsMin": 8, "localDigitsMax": 8, "stripLeadingZero": False, "example": "3312 3456"},
    "RO": {"localDigitsMin": 9, "localDigitsMax": 9, "stripLeadingZero": True, "example": "712 345 678"},
    "RS": {"localDigitsMin": 8, "localDigitsMax": 9, "stripLeadingZero": True, "example": "60 1234567"},
    "SA": {"localDigitsMin": 9, "localDigitsMax": 9, "stripLeadingZero": True, "example": "50 123 4567"},
    "SE": {"localDigitsMin": 9, "localDigitsMax": 9, "stripLeadingZero": True, "example": "70 123 45 67"},
    "SG": {"localDigitsMin": 8, "localDigitsMax": 8, "stripLeadingZero": False, "example": "8123 4567"},
    "SI": {"localDigitsMin": 8, "localDigitsMax": 8, "stripLeadingZero": True, "example": "31 234 567"},
    "SK": {"localDigitsMin": 9, "localDigitsMax": 9, "stripLeadingZero": True, "example": "901 234 567"},
    "TH": {"localDigitsMin": 9, "localDigitsMax": 9, "stripLeadingZero": True, "example": "81 234 5678"},
    "TN": {"localDigitsMin": 8, "localDigitsMax": 8, "stripLeadingZero": False, "example": "20 123 456"},
    "TR": {"localDigitsMin": 10, "localDigitsMax": 10, "stripLeadingZero": True, "example": "532 123 4567"},
    "TW": {"localDigitsMin": 9, "localDigitsMax": 9, "stripLeadingZero": True, "example": "912 345 678"},
    "UA": {"localDigitsMin": 9, "localDigitsMax": 9, "stripLeadingZero": True, "example": "50 123 4567"},
    "AE": {"localDigitsMin": 9, "localDigitsMax": 9, "stripLeadingZero": True, "example": "50 123 4567"},
    "US": {"localDigitsMin": 10, "localDigitsMax": 10, "stripLeadingZero": False, "example": "415 555 0198"},
    "UY": {"localDigitsMin": 8, "localDigitsMax": 8, "stripLeadingZero": False, "example": "94 123 456"},
    "VE": {"localDigitsMin": 10, "localDigitsMax": 10, "stripLeadingZero": True, "example": "412 123 4567"},
    "VN": {"localDigitsMin": 9, "localDigitsMax": 10, "stripLeadingZero": True, "example": "91 234 5678"},
    "ZA": {"localDigitsMin": 9, "localDigitsMax": 9, "stripLeadingZero": True, "example": "82 123 4567"},
}


PHONE_COUNTRIES = []
for iso, name, dial_code in PHONE_COUNTRY_BASE:
    country = {
        "iso": iso,
        "name": name,
        "dialCode": dial_code,
        **DEFAULT_PHONE_RULE,
        **PHONE_RULE_OVERRIDES.get(iso, {}),
    }
    PHONE_COUNTRIES.append(country)

PHONE_COUNTRY_BY_ISO = {item["iso"]: item for item in PHONE_COUNTRIES}


def get_phone_country(phone_country_iso):
    if not phone_country_iso:
        return None
    return PHONE_COUNTRY_BY_ISO.get(str(phone_country_iso).strip().upper())


def normalize_phone_country_iso(phone_country_iso):
    country = get_phone_country(phone_country_iso)
    if not country:
        return None
    return country["iso"]


def validate_phone_number_for_country(phone_number, phone_country_iso):
    country = get_phone_country(phone_country_iso)
    if country is None:
        raise ValueError("Phone country is not supported")

    if phone_number is None:
        return None

    phone_number = str(phone_number).strip()
    if not phone_number:
        return None

    dial_code = country["dialCode"]
    dial_digits = dial_code.lstrip("+")
    if not phone_number.startswith(dial_code):
        raise ValueError(f"Phone number for {country['name']} must start with {dial_code}")

    local_digits = phone_number[len(dial_code):]
    if not local_digits.isdigit():
        raise ValueError(f"Phone number for {country['name']} must contain digits only after {dial_code}")

    local_length = len(local_digits)
    min_digits = country["localDigitsMin"]
    max_digits = country["localDigitsMax"]
    if local_length < min_digits or local_length > max_digits:
        if min_digits == max_digits:
            raise ValueError(
                f"Phone number for {country['name']} must contain {min_digits} local digits after {dial_code}"
            )
        raise ValueError(
            f"Phone number for {country['name']} must contain between {min_digits} and {max_digits} local digits after {dial_code}"
        )

    if country.get("stripLeadingZero") and local_digits.startswith("0"):
        raise ValueError(
            f"Phone number for {country['name']} must not keep the local leading 0 after {dial_code}"
        )

    if len(dial_digits) + local_length > 15:
        raise ValueError("Phone number exceeds the international E.164 limit")

    return phone_number
