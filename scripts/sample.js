let some = { +
    "intent": "CAPTURE",
    "purchase_units": [
  {
    "reference_id": "REFID-000-1001",
    "amount": {
      "currency_code": "CAD",
      "value": "10.00"
    },
    "payee": {
      "email_address": "seller@paypal.com"
    },
    "payment_instruction": {
      "platform_fees": [
        {
          "amount": {
            "currency_code": "CAD",
            "value": "1.00"
          },
          "payee": {
            "email_address": "_sys_aquarium-1696754097380342@paypal.com"
          }
        }
      ],
      "disbursement_mode": "INSTANT",
      "payee_pricing_tier_id": "999ZAE"
    }
  }
],
    "payment_source": {
  "apple_pay": {
    "id": "DSF32432423FSDFS",
        "name": "Randy Oscar",
        "email_address": "randy.oscar@gmail.com",
        "phone_number": {
      "country_code": "1",
          "national_number": "18882211161"
    },
    "shipping": {
      "name": {
        "given_name": "Randy",
            "surname": "Oscar"
      },
      "email_address": "randy.oscar@gmail.com",
          "address": {
        "address_line_1": "123 Townsend S",
            "address_line_2": "Floor 6",
            "admin_area_2": "San Francisc",
            "admin_area_1": "CA",
            "postal_code": "94107",
            "country_code": "US"
      }
    },
    "decrypted_token": {
      "transaction_amount": {
        "currency_code": "USD",
            "value": "10.00"
      },
      "tokenized_card": {
        "number": "4111111111114672",
            "expiry": "2022-02",
            "billing_address": {
          "address_line_1": "123 Townsend S",
              "address_line_2": "Floor 6",
              "admin_area_2": "San Francisc",
              "admin_area_1": "CA",
              "postal_code": "94107",
              "country_code": "US"
        }
      },
      "device_manufacturer_id": "040010030273",
          "payment_data_type": "3DSECURE",
          "payment_data": {
        "cryptogram": "SaDA0Gw9cR37j8xrZP6VFCJpa",
            "eci_indicator": "7"
      }
    }
  }
}
};