const parcelFee = 1.3;
const insurance = 0.035;

const shippingDataDefault = {
  "pkg": {
    "base": {
      "cost": 4.598425,
      "weight": 10
    },
    "add": {
      "cost": 0.008740,
      "weight": 1
    }
  },
  "parcel": {
    "base": {
      "cost": 37.730,
      "weight": 1000
    },
    "add": {
      "cost": 1.820,
      "weight": 100
    }
  }
}

const shippingData = {
  "AX" :
      {
        "description": {
          "en": "Aland Islands",
          "ru": "Аландские острова"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 20.66,
          "add": 0.236
        }
      },

  "AL" :
      {
        "description": {
          "en": "Albania",
          "ru": "Албания"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 18.4,
          "add": 0.212
        }
      },

  "AD" :
      {
        "description": {
          "en": "Andorra",
          "ru": "Андора"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 18.22,
          "add": 0.164
        }
      },

  "AU" :
      {
        "description": {
          "en": "Australia",
          "ru": "Австралия"
        },
        "pkg": {
          "base": 4.838583,
          "add": 0.016063,
        },
        "parcel": {
          "base": 24.54,
          "add": 1.168
        }
      },

  "AT" :
      {
        "description": {
          "en": "Austria",
          "ru": "Австрия "
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 17.72,
          "add": 0.212
        }
      },

  "BY" :
      {
        "description": {
          "en": "Belarus",
          "ru": "Беларусь"
        },
        "pkg": {
          "base": 0.75,
          "add": 0.00074,
        },
        "parcel": {
          "base": 1.42,
          "add": 0.030
        }
      },

  "BE" :
      {
        "description": {
          "en": "Belgium",
          "ru": "Бельгия"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 22.70,
          "add": 0.292
        }
      },

  "BA" :
      {
        "description": {
          "en": "Bosnia and Herzegovina",
          "ru": "Босния и Герцеговина"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 19.42,
          "add": 0.336
        }
      },

  "BR" :
      {
        "description": {
          "en": "Brazil",
          "ru": "Бразилия"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 27.96,
          "add": 1.032
        }
      },

  "BG" :
      {
        "description": {
          "en": "Bulgaria",
          "ru": "Болгария"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 15.50,
          "add": 0.312
        }
      },

  "CA" :
      {
        "description": {
          "en": "Canada",
          "ru": "Канада"
        },
        "pkg": {
          "base": 4.838583,
          "add": 0.016063,
        },
        "parcel": {
          "base": 26.40,
          "add": 1.480
        }
      },

  "GB-GSY" :
      {
        "description": {
          "en": "Channel Islands",
          "ru": "Нормандские острова"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 23.40,
          "add": 0.420
        }
      },

  "CL" :
      {
        "description": {
          "en": "Chile",
          "ru": "Чили"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 34.90,
          "add": 1.820
        }
      },

  "HR" :
      {
        "description": {
          "en": "Croatia",
          "ru": "Хорватия"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 15.56,
          "add": 0.276
        }
      },

  "CY" :
      {
        "description": {
          "en": "Cyprus",
          "ru": "Кипр"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 16.94,
          "add": 0.460
        }
      },

  "CZ" :
      {
        "description": {
          "en": "Czech Republic",
          "ru": "Чехия"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 13.90,
          "add": 0.164
        }
      },

  "DK" :
      {
        "description": {
          "en": "Denmark",
          "ru": "Дания"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 18.34,
          "add": 0.248
        }
      },

  "EE" :
      {
        "description": {
          "en": "Estonia",
          "ru": "Эстония"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 15.12,
          "add": 0.208
        }
      },

  "FO" :
      {
        "description": {
          "en": "Faroe Islands",
          "ru": "Фарейские острова"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 22.46,
          "add": 0.408
        }
      },

  "FI" :
      {
        "description": {
          "en": "Finland",
          "ru": "Финляндия"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 20.66,
          "add": 0.236
        }
      },

  "FR" :
      {
        "description": {
          "en": "France",
          "ru": "Франция"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 18.04,
          "add": 0.164
        }
      },

  "GE" :
      {
        "description": {
          "en": "Georgia",
          "ru": "Грузия"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 19.94,
          "add": 0.336
        }
      },

  "DE" :
      {
        "description": {
          "en": "Germany",
          "ru": "Германия"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 21.84,
          "add": 0.520
        }
      },

  "GI" :
      {
        "description": {
          "en": "Gibraltar",
          "ru": "Гибралтар"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 21.08,
          "add": 0.616
        }
      },

  "GR" :
      {
        "description": {
          "en": "Greece",
          "ru": "Греция"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 16.38,
          "add": 0.420
        }
      },

  "GL" :
      {
        "description": {
          "en": "Greenland",
          "ru": "Гренладния"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 37.14,
          "add": 0.584
        }
      },

  "GG" :
      {
        "description": {
          "en": "Guernsey",
          "ru": "Гернси"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 22.22,
          "add": 0.336
        }
      },

  "HK" :
      {
        "description": {
          "en": "Hong Kong",
          "ru": "Гонконг"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 21.58,
          "add": 0.488
        }
      },

  "HU" :
      {
        "description": {
          "en": "Hungary",
          "ru": "Венгрия"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 20.58,
          "add": 0.324
        }
      },

  "IS" :
      {
        "description": {
          "en": "Iceland",
          "ru": "Исландия"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 30.8,
          "add": 0.616
        }
      },

  "IN" :
      {
        "description": {
          "en": "India",
          "ru": "Индия"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 22.28,
          "add": 0.588
        }
      },

  "IE" :
      {
        "description": {
          "en": "Ireland",
          "ru": "Ирландия"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 22.22,
          "add": 0.336
        }
      },

  "IM" :
      {
        "description": {
          "en": "Isle of Man",
          "ru": "Остров Мэн"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 23.40,
          "add": 0.420
        }
      },

  "IL" :
      {
        "description": {
          "en": "Israel",
          "ru": "Израиль"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 16.12,
          "add": 0.268
        }
      },

  "IT" :
      {
        "description": {
          "en": "Italy",
          "ru": "Италия"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 15.82,
          "add": 0.224
        }
      },

  "JP" :
      {
        "description": {
          "en": "Japan",
          "ru": "Япония"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 17.84,
          "add": 0.460
        }
      },

  "XK" :
      {
        "description": {
          "en": "Kosovo",
          "ru": "Косово"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 23.50,
          "add": 0.380
        }
      },

  "LV" :
      {
        "description": {
          "en": "Latvia",
          "ru": "Латвия"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 11.96,
          "add": 0.184
        }
      },

  "LI" :
      {
        "description": {
          "en": "Liechtenstein",
          "ru": "Лихтенштейн"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 18.36,
          "add": 0.324
        }
      },

  "LT" :
      {
        "description": {
          "en": "Lithuania",
          "ru": "Литва"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 17.34,
          "add": 0.164
        }
      },

  "LU" :
      {
        "description": {
          "en": "Luxembourg",
          "ru": "Люксембург"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 19.34,
          "add": 0.228
        }
      },

  "MK" :
      {
        "description": {
          "en": "Macedonia",
          "ru": "Македония"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 19.40,
          "add": 0.348
        }
      },

  "MY" :
      {
        "description": {
          "en": "Malaysia",
          "ru": "Малайзия"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 18.30,
          "add": 0.348
        }
      },

  "MT" :
      {
        "description": {
          "en": "Malta",
          "ru": "Мальта"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 25.46,
          "add": 0.760
        }
      },

  "MX" :
      {
        "description": {
          "en": "Mexico",
          "ru": "Мексика"
        },
        "pkg": {
          "base": 4.838583,
          "add": 0.016063,
        },
        "parcel": {
          "base": 19.24,
          "add": 0.870
        }
      },

  "MD" :
      {
        "description": {
          "en": "Moldova",
          "ru": "Молдова"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 17.06,
          "add": 0.360
        }
      },

  "MC" :
      {
        "description": {
          "en": "Monaco",
          "ru": "Монако"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 18.22,
          "add": 0.164
        }
      },

  "ME" :
      {
        "description": {
          "en": "Montenegro",
          "ru": "Черногория"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 21.04,
          "add": 0.312
        }
      },

  "NL" :
      {
        "description": {
          "en": "Netherlands",
          "ru": "Нидерланды"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 16.26,
          "add": 0.500
        }
      },

  "NZ" :
      {
        "description": {
          "en": "New Zealand",
          "ru": "Новая Зеландия"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 31.58,
          "add": 1.472
        }
      },

  "NO" :
      {
        "description": {
          "en": "Norway",
          "ru": "Норвегия"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 23.94,
          "add": 0.348
        }
      },

  "PL" :
      {
        "description": {
          "en": "Poland",
          "ru": "Польша"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 15.76,
          "add": 0.172
        }
      },

  "PT" :
      {
        "description": {
          "en": "Portugal",
          "ru": "Португалия"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 23.00,
          "add": 0.340
        }
      },

  "RO" :
      {
        "description": {
          "en": "Romania",
          "ru": "Румыния"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 22.10,
          "add": 0.376
        }
      },

  "RU" :
      {
        "description": {
          "en": "Russia",
          "ru": "Россия"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 24.04,
          "add": 0.404
        }
      },

  "SM" :
      {
        "description": {
          "en": "San Marino",
          "ru": "Сан-Марино"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 15.82,
          "add": 0.224
        }
      },

  "RS" :
      {
        "description": {
          "en": "Serbia",
          "ru": "Сербия"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 18.40,
          "add": 0.212
        }
      },

  "SC" :
      {
        "description": {
          "en": "Seychelles",
          "ru": "Сейшильские острова"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 22.64,
          "add": 0.870
        }
      },

  "SG" :
      {
        "description": {
          "en": "Singapore",
          "ru": "Сингапур"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 17.86,
          "add": 0.384
        }
      },

  "SK" :
      {
        "description": {
          "en": "Slovakia",
          "ru": "Словакия"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 15.84,
          "add": 0.256
        }
      },

  "SI" :
      {
        "description": {
          "en": "Slovenia",
          "ru": "Словения"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 18.22,
          "add": 0.260
        }
      },

  "KR" :
      {
        "description": {
          "en": "South Korea",
          "ru": "Южная Корея"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 20.76,
          "add": 0.484
        }
      },

  "ES" :
      {
        "description": {
          "en": "Spain",
          "ru": "Испания"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 18.86,
          "add": 0.420
        }
      },

  "SE" :
      {
        "description": {
          "en": "Sweden",
          "ru": "Швеция"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 21.08,
          "add": 0.336
        }
      },

  "CH" :
      {
        "description": {
          "en": "Switzerland",
          "ru": "Швейцария"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 17.26,
          "add": 0.324
        }
      },

  "TW" :
      {
        "description": {
          "en": "Taiwan",
          "ru": "Тайвань"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 23.50,
          "add": 0.780
        }
      },

  "TH" :
      {
        "description": {
          "en": "Thailand",
          "ru": "Таиланд"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 17.47,
          "add": 0.420
        }
      },

  "TR" :
      {
        "description": {
          "en": "Turkey",
          "ru": "Турция"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 18.84,
          "add": 0.348
        }
      },

  "UA" :
      {
        "description": {
          "en": "Ukraine",
          "ru": "Украина"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 21.10,
          "add": 0.196
        }
      },

  "GB" :
      {
        "description": {
          "en": "United Kingdom",
          "ru": "Великобритания"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 23.40,
          "add": 0.420
        }
      },

  "US" :
      {
        "description": {
          "en": "United States",
          "ru": "США"
        },
        "pkg": {
          "base": 6.77164,
          "add": 0.016063,
        },
        "parcel": {
          "base": 21.44,
          "add": 0.956
        }
      },

  "VA" :
      {
        "description": {
          "en": "Vatican",
          "ru": "Ватикан"
        },
        "pkg": {
          "base": null,
          "add": null,
        },
        "parcel": {
          "base": 19.34,
          "add": 0.232
        }
      }
};

export {shippingDataDefault, shippingData, parcelFee, insurance};