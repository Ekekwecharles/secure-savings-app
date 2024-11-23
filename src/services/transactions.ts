import { add, format } from "date-fns";
import { faker } from "@faker-js/faker";
import { getTransactionsMessages } from "../firebase/apiFirebase";

// let transactionData = [
//   {
//     id: "TRANS-32",
//     date: "2024-10-15 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Debit",
//     amount: "297051.00",
//     sender: null,
//     receiver: "Casper and Sons",
//     referenceCode: "9u5gIsHZ3dgmLvWa",
//     accountNumber: "19400216",
//     location: "Sudan",
//     balanceAfterTransaction: "12341555.00",
//   },
//   {
//     id: "TRANS-49",
//     date: "2024-10-15 00:00:00",
//     transactionType: "Mobile Transfer",
//     status: "Debit",
//     amount: "733778.00",
//     sender: null,
//     receiver: "Melvin Murphy",
//     referenceCode: "ryiRV5qgm9pzUrMG",
//     accountNumber: "13303953",
//     location: "Pitcairn Islands",
//     balanceAfterTransaction: "11211991.00",
//   },
//   {
//     id: "TRANS-65",
//     date: "2024-10-15 00:00:00",
//     transactionType: "Bank Deposit",
//     status: "Debit",
//     amount: "316925.00",
//     sender: null,
//     receiver: "Rudolph Cartwright",
//     referenceCode: "ccHXzts9CwrvP8T3",
//     accountNumber: "77812904",
//     location: "Tokelau",
//     balanceAfterTransaction: "13905354.00",
//   },
//   {
//     id: "TRANS-76",
//     date: "2024-10-15 00:00:00",
//     transactionType: "Mobile Transfer",
//     status: "Credit",
//     amount: "111736.00",
//     sender: "Dooley, Labadie and Kovacek",
//     receiver: null,
//     referenceCode: "r1UOvmF0ba8z234S",
//     accountNumber: "68509651",
//     location: "Denmark",
//     balanceAfterTransaction: "13327041.00",
//   },
//   {
//     id: "TRANS-80",
//     date: "2024-10-15 00:00:00",
//     transactionType: "Bank Deposit",
//     status: "Debit",
//     amount: "348048.00",
//     sender: null,
//     receiver: "Bernadette Oberbrunner",
//     referenceCode: "Eq2067DutRW8kuSf",
//     accountNumber: "94673224",
//     location: "Taiwan",
//     balanceAfterTransaction: "12463620.00",
//   },
//   {
//     id: "TRANS-9",
//     date: "2024-10-16 00:00:00",
//     transactionType: "Bank Deposit",
//     status: "Credit",
//     amount: "912749.00",
//     sender: "Considine, Adams and Schroeder",
//     receiver: null,
//     referenceCode: "KxDWtphz1rt2bgVE",
//     accountNumber: "15485533",
//     location: "Armenia",
//     balanceAfterTransaction: "7421842.00",
//   },
//   {
//     id: "TRANS-43",
//     date: "2024-10-16 00:00:00",
//     transactionType: "Mobile Transfer",
//     status: "Credit",
//     amount: "749458.00",
//     sender: "Eunice Stokes",
//     receiver: null,
//     referenceCode: "WawARf0SE6E9J4eK",
//     accountNumber: "77135587",
//     location: "Latvia",
//     balanceAfterTransaction: "12790055.00",
//   },
//   {
//     id: "TRANS-54",
//     date: "2024-10-16 00:00:00",
//     transactionType: "Mobile Transfer",
//     status: "Credit",
//     amount: "757596.00",
//     sender: "Hand - Moore",
//     receiver: null,
//     referenceCode: "Kz5YbGRs06wqphgm",
//     accountNumber: "54771931",
//     location: "Liberia",
//     balanceAfterTransaction: "11104345.00",
//   },
//   {
//     id: "TRANS-59",
//     date: "2024-10-16 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Credit",
//     amount: "406810.00",
//     sender: "Ray Kshlerin",
//     receiver: null,
//     referenceCode: "emBIkui1536lywNv",
//     accountNumber: "31384840",
//     location: "Ireland",
//     balanceAfterTransaction: "12769313.00",
//   },
//   {
//     id: "TRANS-26",
//     date: "2024-10-17 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Credit",
//     amount: "529548.00",
//     sender: "Mrs. Kathleen Schmidt",
//     receiver: null,
//     referenceCode: "kgnJyCvgoXeqPTUo",
//     accountNumber: "48921854",
//     location: "Equatorial Guinea",
//     balanceAfterTransaction: "12730909.00",
//   },
//   {
//     id: "TRANS-60",
//     date: "2024-10-17 00:00:00",
//     transactionType: "Bank Deposit",
//     status: "Debit",
//     amount: "80760.00",
//     sender: null,
//     receiver: "Megan Graham",
//     referenceCode: "mfpXAWdNOOBhUbm8",
//     accountNumber: "27699385",
//     location: "Slovakia",
//     balanceAfterTransaction: "12688553.00",
//   },
//   {
//     id: "TRANS-17",
//     date: "2024-10-18 00:00:00",
//     transactionType: "Bank Deposit",
//     status: "Credit",
//     amount: "479738.00",
//     sender: "Luz Welch",
//     receiver: null,
//     referenceCode: "mJz950yuyXJg2P8k",
//     accountNumber: "19059098",
//     location: "Guadeloupe",
//     balanceAfterTransaction: "10751771.00",
//   },
//   {
//     id: "TRANS-41",
//     date: "2024-10-18 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Debit",
//     amount: "921185.00",
//     sender: null,
//     receiver: "Eileen Frami III",
//     referenceCode: "0j9xZyHaGFhvrDCt",
//     accountNumber: "20321867",
//     location: "Egypt",
//     balanceAfterTransaction: "12157661.00",
//   },
//   {
//     id: "TRANS-68",
//     date: "2024-10-18 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Debit",
//     amount: "465408.00",
//     sender: null,
//     receiver: "Hoeger Group",
//     referenceCode: "hMDT8E7e1XJffyuu",
//     accountNumber: "48616360",
//     location: "Moldova",
//     balanceAfterTransaction: "13741366.00",
//   },
//   {
//     id: "TRANS-45",
//     date: "2024-10-19 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Credit",
//     amount: "187800.00",
//     sender: "Ervin Von PhD",
//     receiver: null,
//     referenceCode: "G6k9B7ET5r9bF6sL",
//     accountNumber: "60957955",
//     location: "Gabon",
//     balanceAfterTransaction: "12696860.00",
//   },
//   {
//     id: "TRANS-64",
//     date: "2024-10-20 00:00:00",
//     transactionType: "Mobile Transfer",
//     status: "Credit",
//     amount: "201061.00",
//     sender: "Bergstrom and Sons",
//     receiver: null,
//     referenceCode: "Oz2jcwti9fnJWtM9",
//     accountNumber: "54229235",
//     location: "Austria",
//     balanceAfterTransaction: "14222279.00",
//   },
//   {
//     id: "TRANS-27",
//     date: "2024-10-21 00:00:00",
//     transactionType: "Mobile Transfer",
//     status: "Credit",
//     amount: "649881.00",
//     sender: "Jakubowski, Bednar and Gleason",
//     receiver: null,
//     referenceCode: "4YueXzFFU55d6js0",
//     accountNumber: "45526507",
//     location: "Hong Kong",
//     balanceAfterTransaction: "13380790.00",
//   },
//   {
//     id: "TRANS-13",
//     date: "2024-10-22 00:00:00",
//     transactionType: "Bank Deposit",
//     status: "Debit",
//     amount: "1016221.00",
//     sender: null,
//     receiver: "Elvira Dibbert",
//     referenceCode: "3uFIdpGcdCwsdMxv",
//     accountNumber: "45787082",
//     location: "Saint Helena",
//     balanceAfterTransaction: "7605238.00",
//   },
//   {
//     id: "TRANS-29",
//     date: "2024-10-22 00:00:00",
//     transactionType: "Mobile Transfer",
//     status: "Debit",
//     amount: "227321.00",
//     sender: null,
//     receiver: "Kristi Emard",
//     referenceCode: "vBuQSYngnrIHO5tq",
//     accountNumber: "78735944",
//     location: "Belgium",
//     balanceAfterTransaction: "12160270.00",
//   },
//   {
//     id: "TRANS-40",
//     date: "2024-10-22 00:00:00",
//     transactionType: "Bank Deposit",
//     status: "Debit",
//     amount: "486274.00",
//     sender: null,
//     receiver: "Collier, Marvin and Schamberger",
//     referenceCode: "gXGL8S8vcHSAbl0I",
//     accountNumber: "70774147",
//     location: "Nicaragua",
//     balanceAfterTransaction: "13078846.00",
//   },
//   {
//     id: "TRANS-51",
//     date: "2024-10-22 00:00:00",
//     transactionType: "Mobile Transfer",
//     status: "Debit",
//     amount: "318208.00",
//     sender: null,
//     receiver: "Dr. Donald Cartwright",
//     referenceCode: "KS6i1kHNa2tulCf6",
//     accountNumber: "59351831",
//     location: "Iraq",
//     balanceAfterTransaction: "10150969.00",
//   },
//   {
//     id: "TRANS-70",
//     date: "2024-10-22 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Debit",
//     amount: "605207.00",
//     sender: null,
//     receiver: "Trevor Bartoletti",
//     referenceCode: "9BdmUGSKHjWZ9rAY",
//     accountNumber: "01592115",
//     location: "Colombia",
//     balanceAfterTransaction: "12414193.00",
//   },
//   {
//     id: "TRANS-79",
//     date: "2024-10-24 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Credit",
//     amount: "674859.00",
//     sender: "Brown - Quitzon",
//     receiver: null,
//     referenceCode: "262wQh44cAQl8DVv",
//     accountNumber: "98043542",
//     location: "Palestine",
//     balanceAfterTransaction: "12811668.00",
//   },
//   {
//     id: "TRANS-6",
//     date: "2024-10-25 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Credit",
//     amount: "1137483.00",
//     sender: "Tromp Inc",
//     receiver: null,
//     referenceCode: "jX97dxVC6ynoP81Y",
//     accountNumber: "59532689",
//     location: "Saint Helena",
//     balanceAfterTransaction: "5543147.00",
//   },
//   {
//     id: "TRANS-16",
//     date: "2024-10-25 00:00:00",
//     transactionType: "Mobile Transfer",
//     status: "Credit",
//     amount: "822506.00",
//     sender: "Brakus Inc",
//     receiver: null,
//     referenceCode: "1kLmXAHQfGxexfYA",
//     accountNumber: "65604494",
//     location: "Azerbaijan",
//     balanceAfterTransaction: "10272033.00",
//   },
//   {
//     id: "TRANS-37",
//     date: "2024-10-25 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Credit",
//     amount: "629252.00",
//     sender: "Metz - D'Amore",
//     receiver: null,
//     referenceCode: "coZKnguH0paoPygo",
//     accountNumber: "48396060",
//     location: "Bahrain",
//     balanceAfterTransaction: "12582350.00",
//   },
//   {
//     id: "TRANS-35",
//     date: "2024-10-26 00:00:00",
//     transactionType: "Mobile Transfer",
//     status: "Credit",
//     amount: "561248.00",
//     sender: "Shaun Windler IV",
//     receiver: null,
//     referenceCode: "zIJfFCx0JhQtvqbP",
//     accountNumber: "13913713",
//     location: "Falkland Islands (Malvinas)",
//     balanceAfterTransaction: "12222669.00",
//   },
//   {
//     id: "TRANS-53",
//     date: "2024-10-26 00:00:00",
//     transactionType: "Bank Deposit",
//     status: "Credit",
//     amount: "93219.00",
//     sender: "Treutel LLC",
//     receiver: null,
//     referenceCode: "QGEL8T9YIoP3YsHW",
//     accountNumber: "34631634",
//     location: "Norway",
//     balanceAfterTransaction: "10346749.00",
//   },
//   {
//     id: "TRANS-2",
//     date: "2024-10-27 00:00:00",
//     transactionType: "Mobile Transfer",
//     status: "Credit",
//     amount: "562017.00",
//     sender: "Lowe - Wintheiser",
//     receiver: null,
//     referenceCode: "X17XIHVvOlBQUyUo",
//     accountNumber: "41985708",
//     location: "Honduras",
//     balanceAfterTransaction: "4993551.00",
//   },
//   {
//     id: "TRANS-34",
//     date: "2024-10-27 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Debit",
//     amount: "579478.00",
//     sender: null,
//     receiver: "Melissa Bashirian",
//     referenceCode: "fBir6Chb0xNOfrlg",
//     accountNumber: "38668639",
//     location: "Guyana",
//     balanceAfterTransaction: "11661421.00",
//   },
//   {
//     id: "TRANS-42",
//     date: "2024-10-27 00:00:00",
//     transactionType: "Mobile Transfer",
//     status: "Debit",
//     amount: "117064.00",
//     sender: null,
//     receiver: "Kuhlman LLC",
//     referenceCode: "7bHLvI0Ak4xyvu0D",
//     accountNumber: "50062405",
//     location: "Iran",
//     balanceAfterTransaction: "12040597.00",
//   },
//   {
//     id: "TRANS-52",
//     date: "2024-10-27 00:00:00",
//     transactionType: "Bank Deposit",
//     status: "Credit",
//     amount: "102561.00",
//     sender: "Robel, Johns and Wolff",
//     receiver: null,
//     referenceCode: "HQ7ey8tB1cCeQ9bp",
//     accountNumber: "78196388",
//     location: "Bahamas",
//     balanceAfterTransaction: "10253530.00",
//   },
//   {
//     id: "TRANS-75",
//     date: "2024-10-27 00:00:00",
//     transactionType: "Bank Deposit",
//     status: "Credit",
//     amount: "666237.00",
//     sender: "Weber and Sons",
//     receiver: null,
//     referenceCode: "muJvB8EJhTDkro09",
//     accountNumber: "07058806",
//     location: "Anguilla",
//     balanceAfterTransaction: "13215305.00",
//   },
//   {
//     id: "TRANS-7",
//     date: "2024-10-28 00:00:00",
//     transactionType: "Bank Deposit",
//     status: "Credit",
//     amount: "335366.00",
//     sender: "Kiehn - Gerlach",
//     receiver: null,
//     referenceCode: "vHKNRvnZoO61zomo",
//     accountNumber: "20473514",
//     location: "Mozambique",
//     balanceAfterTransaction: "5878513.00",
//   },
//   {
//     id: "TRANS-19",
//     date: "2024-10-28 00:00:00",
//     transactionType: "Mobile Transfer",
//     status: "Credit",
//     amount: "436952.00",
//     sender: "Laverne Kulas",
//     receiver: null,
//     referenceCode: "8BLmgnKvAG3z4YZa",
//     accountNumber: "75336636",
//     location: "Madagascar",
//     balanceAfterTransaction: "11280458.00",
//   },
//   {
//     id: "TRANS-47",
//     date: "2024-10-28 00:00:00",
//     transactionType: "Bank Deposit",
//     status: "Debit",
//     amount: "666553.00",
//     sender: null,
//     receiver: "Kristy Oberbrunner",
//     referenceCode: "rrfXn6JiUzDyTdKh",
//     accountNumber: "49177960",
//     location: "Taiwan",
//     balanceAfterTransaction: "12780169.00",
//   },
//   {
//     id: "TRANS-50",
//     date: "2024-10-28 00:00:00",
//     transactionType: "Bank Deposit",
//     status: "Debit",
//     amount: "742814.00",
//     sender: null,
//     receiver: "Murazik - Mertz",
//     referenceCode: "SCD58jwYkI88lWHR",
//     accountNumber: "77853756",
//     location: "Honduras",
//     balanceAfterTransaction: "10469177.00",
//   },
//   {
//     id: "TRANS-55",
//     date: "2024-10-28 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Debit",
//     amount: "267591.00",
//     sender: null,
//     receiver: "Adrian Torp",
//     referenceCode: "aqMEhuYPWgIP8FdZ",
//     accountNumber: "13962682",
//     location: "Montserrat",
//     balanceAfterTransaction: "10836754.00",
//   },
//   {
//     id: "TRANS-57",
//     date: "2024-10-28 00:00:00",
//     transactionType: "Bank Deposit",
//     status: "Credit",
//     amount: "432066.00",
//     sender: "Al Quitzon",
//     receiver: null,
//     referenceCode: "JDtyaIr7HYkvU3uh",
//     accountNumber: "50841731",
//     location: "Vanuatu",
//     balanceAfterTransaction: "11882694.00",
//   },
//   {
//     id: "TRANS-25",
//     date: "2024-10-29 00:00:00",
//     transactionType: "Mobile Transfer",
//     status: "Credit",
//     amount: "422793.00",
//     sender: "Olga Howell",
//     receiver: null,
//     referenceCode: "v2rTPdT78lJxb1gS",
//     accountNumber: "43891212",
//     location: "Poland",
//     balanceAfterTransaction: "12201361.00",
//   },
//   {
//     id: "TRANS-61",
//     date: "2024-10-29 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Credit",
//     amount: "404428.00",
//     sender: "Lena Price",
//     receiver: null,
//     referenceCode: "0xqB8I1WBpGtXLhm",
//     accountNumber: "36752370",
//     location: "Tonga",
//     balanceAfterTransaction: "13092981.00",
//   },
//   {
//     id: "TRANS-77",
//     date: "2024-10-29 00:00:00",
//     transactionType: "Bank Deposit",
//     status: "Debit",
//     amount: "665583.00",
//     sender: null,
//     receiver: "Ortiz, Bradtke and Streich",
//     referenceCode: "YgaDqWnCy6OfdRvb",
//     accountNumber: "89075300",
//     location: "Paraguay",
//     balanceAfterTransaction: "12661458.00",
//   },
//   {
//     id: "TRANS-12",
//     date: "2024-10-30 00:00:00",
//     transactionType: "Bank Deposit",
//     status: "Debit",
//     amount: "523043.00",
//     sender: null,
//     receiver: "Walsh and Sons",
//     referenceCode: "DL4D0OEp8EDxN3Mz",
//     accountNumber: "75300967",
//     location: "Anguilla",
//     balanceAfterTransaction: "8621459.00",
//   },
//   {
//     id: "TRANS-20",
//     date: "2024-10-30 00:00:00",
//     transactionType: "Mobile Transfer",
//     status: "Credit",
//     amount: "1065047.00",
//     sender: "Armando Goldner-Wilderman",
//     receiver: null,
//     referenceCode: "XT05rErRtuFCsUd4",
//     accountNumber: "31703416",
//     location: "Zimbabwe",
//     balanceAfterTransaction: "12345505.00",
//   },
//   {
//     id: "TRANS-62",
//     date: "2024-10-30 00:00:00",
//     transactionType: "Bank Deposit",
//     status: "Credit",
//     amount: "318549.00",
//     sender: "Dr. Gordon Stroman V",
//     receiver: null,
//     referenceCode: "faPf4Bye7wSGFeaE",
//     accountNumber: "47447368",
//     location: "Bahamas",
//     balanceAfterTransaction: "13411530.00",
//   },
//   {
//     id: "TRANS-66",
//     date: "2024-10-30 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Credit",
//     amount: "450360.00",
//     sender: "Norma Ferry",
//     receiver: null,
//     referenceCode: "q0KjJb7sHxyLA4QY",
//     accountNumber: "18405056",
//     location: "Switzerland",
//     balanceAfterTransaction: "14355714.00",
//   },
//   {
//     id: "TRANS-67",
//     date: "2024-10-30 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Debit",
//     amount: "148940.00",
//     sender: null,
//     receiver: "Smitham, West and Romaguera",
//     referenceCode: "KTPwSNXNb6t5nBE1",
//     accountNumber: "20808140",
//     location: "Israel",
//     balanceAfterTransaction: "14206774.00",
//   },
//   {
//     id: "TRANS-48",
//     date: "2024-10-31 00:00:00",
//     transactionType: "Mobile Transfer",
//     status: "Debit",
//     amount: "834400.00",
//     sender: null,
//     receiver: "Beer - Nienow",
//     referenceCode: "a8ma3uWKd243qTlD",
//     accountNumber: "80555057",
//     location: "Cote d'Ivoire",
//     balanceAfterTransaction: "11945769.00",
//   },
//   {
//     id: "TRANS-72",
//     date: "2024-10-31 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Credit",
//     amount: "151602.00",
//     sender: "Rene McClure",
//     receiver: null,
//     referenceCode: "5mWy62t5sJYtHKoV",
//     accountNumber: "04983090",
//     location: "Uruguay",
//     balanceAfterTransaction: "13138142.00",
//   },
//   {
//     id: "TRANS-74",
//     date: "2024-10-31 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Credit",
//     amount: "73490.00",
//     sender: "Joey Gutmann",
//     receiver: null,
//     referenceCode: "LV22A8q18yfmpqhl",
//     accountNumber: "42749003",
//     location: "Burkina Faso",
//     balanceAfterTransaction: "12549068.00",
//   },
//   {
//     id: "TRANS-71",
//     date: "2024-11-01 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Credit",
//     amount: "572347.00",
//     sender: "Winston Weissnat",
//     receiver: null,
//     referenceCode: "3ukyV01i5IN6B2pX",
//     accountNumber: "81666658",
//     location: "Denmark",
//     balanceAfterTransaction: "12986540.00",
//   },
//   {
//     id: "TRANS-73",
//     date: "2024-11-01 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Debit",
//     amount: "662564.00",
//     sender: null,
//     receiver: "Stuart Kilback",
//     referenceCode: "bEDeQADvFLqhqTNV",
//     accountNumber: "74052480",
//     location: "Latvia",
//     balanceAfterTransaction: "12475578.00",
//   },
//   {
//     id: "TRANS-3",
//     date: "2024-11-02 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Credit",
//     amount: "525608.00",
//     sender: "Leticia Ullrich",
//     receiver: null,
//     referenceCode: "XDeKdvQkd09Q0Svy",
//     accountNumber: "92494915",
//     location: "Chile",
//     balanceAfterTransaction: "5519159.00",
//   },
//   {
//     id: "TRANS-8",
//     date: "2024-11-02 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Credit",
//     amount: "630580.00",
//     sender: "Rita Weissnat",
//     receiver: null,
//     referenceCode: "MgcvqoL1Sv9dKsOr",
//     accountNumber: "28764602",
//     location: "Niue",
//     balanceAfterTransaction: "6509093.00",
//   },
//   {
//     id: "TRANS-10",
//     date: "2024-11-02 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Credit",
//     amount: "768732.00",
//     sender: "Toni Lubowitz",
//     receiver: null,
//     referenceCode: "4lr4odA5Q8c29MCq",
//     accountNumber: "91671416",
//     location: "Norway",
//     balanceAfterTransaction: "8190574.00",
//   },
//   {
//     id: "TRANS-4",
//     date: "2024-11-03 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Debit",
//     amount: "512950.00",
//     sender: null,
//     receiver: "Monique Towne-Gleason",
//     referenceCode: "ZVXxJgV5D7qAxP1z",
//     accountNumber: "10932972",
//     location: "Guernsey",
//     balanceAfterTransaction: "5006209.00",
//   },
//   {
//     id: "TRANS-11",
//     date: "2024-11-03 00:00:00",
//     transactionType: "Mobile Transfer",
//     status: "Credit",
//     amount: "953928.00",
//     sender: "Kyle Steuber",
//     receiver: null,
//     referenceCode: "V9alPMJeczdWWf1h",
//     accountNumber: "26600480",
//     location: "Gibraltar",
//     balanceAfterTransaction: "9144502.00",
//   },
//   {
//     id: "TRANS-44",
//     date: "2024-11-03 00:00:00",
//     transactionType: "Mobile Transfer",
//     status: "Debit",
//     amount: "280995.00",
//     sender: null,
//     receiver: "Streich - Homenick",
//     referenceCode: "rnwqWjopGI9bhb75",
//     accountNumber: "46722800",
//     location: "Jamaica",
//     balanceAfterTransaction: "12509060.00",
//   },
//   {
//     id: "TRANS-46",
//     date: "2024-11-03 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Credit",
//     amount: "749862.00",
//     sender: "Zulauf - Cummings",
//     receiver: null,
//     referenceCode: "CrgU939yVCmli9Hc",
//     accountNumber: "00808095",
//     location: "Lithuania",
//     balanceAfterTransaction: "13446722.00",
//   },
//   {
//     id: "TRANS-18",
//     date: "2024-11-04 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Credit",
//     amount: "91735.00",
//     sender: "Jacobi, Cassin and Russel",
//     receiver: null,
//     referenceCode: "25UoYycryr0DqsVh",
//     accountNumber: "42958742",
//     location: "Guyana",
//     balanceAfterTransaction: "10843506.00",
//   },
//   {
//     id: "TRANS-38",
//     date: "2024-11-04 00:00:00",
//     transactionType: "Mobile Transfer",
//     status: "Credit",
//     amount: "425323.00",
//     sender: "Jon McLaughlin",
//     receiver: null,
//     referenceCode: "Zt0CjjRFW0yEC5rt",
//     accountNumber: "87758241",
//     location: "Ghana",
//     balanceAfterTransaction: "13007673.00",
//   },
//   {
//     id: "TRANS-39",
//     date: "2024-11-04 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Credit",
//     amount: "557447.00",
//     sender: "Reynolds Group",
//     receiver: null,
//     referenceCode: "N7ZBPkuLjEnVcbBH",
//     accountNumber: "94998070",
//     location: "Uganda",
//     balanceAfterTransaction: "13565120.00",
//   },
//   {
//     id: "TRANS-21",
//     date: "2024-11-05 00:00:00",
//     transactionType: "Mobile Transfer",
//     status: "Debit",
//     amount: "1029922.00",
//     sender: null,
//     receiver: "Hansen, Heidenreich and Hickle",
//     referenceCode: "L1CvFKQgSjZo9WuK",
//     accountNumber: "82340580",
//     location: "Colombia",
//     balanceAfterTransaction: "11315583.00",
//   },
//   {
//     id: "TRANS-1",
//     date: "2024-11-06 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Debit",
//     amount: "568466.00",
//     sender: null,
//     receiver: "Devin Schowalter",
//     referenceCode: "OMWUD37FBQCdAu64",
//     accountNumber: "23988864",
//     location: "Falkland Islands (Malvinas)",
//     balanceAfterTransaction: "4431534.00",
//   },
//   {
//     id: "TRANS-22",
//     date: "2024-11-06 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Credit",
//     amount: "382238.00",
//     sender: "Cummings and Sons",
//     receiver: null,
//     referenceCode: "CEk8X1Z2QkDPspg3",
//     accountNumber: "94379528",
//     location: "Greece",
//     balanceAfterTransaction: "11697821.00",
//   },
//   {
//     id: "TRANS-30",
//     date: "2024-11-07 00:00:00",
//     transactionType: "Bank Deposit",
//     status: "Debit",
//     amount: "416164.00",
//     sender: null,
//     receiver: "Hoeger LLC",
//     referenceCode: "BEIKpzXLAOi35MpE",
//     accountNumber: "22591790",
//     location: "Svalbard & Jan Mayen Islands",
//     balanceAfterTransaction: "11744106.00",
//   },
//   {
//     id: "TRANS-56",
//     date: "2024-11-08 00:00:00",
//     transactionType: "Mobile Transfer",
//     status: "Credit",
//     amount: "613874.00",
//     sender: "Armstrong, Bernhard and Thompson",
//     receiver: null,
//     referenceCode: "1v0AgQ6jGlnAaeXS",
//     accountNumber: "45667161",
//     location: "Kiribati",
//     balanceAfterTransaction: "11450628.00",
//   },
//   {
//     id: "TRANS-63",
//     date: "2024-11-08 00:00:00",
//     transactionType: "Mobile Transfer",
//     status: "Credit",
//     amount: "609688.00",
//     sender: "Jon Mueller",
//     receiver: null,
//     referenceCode: "IJJKDVAaNnGaBHJl",
//     accountNumber: "78848570",
//     location: "Jamaica",
//     balanceAfterTransaction: "14021218.00",
//   },
//   {
//     id: "TRANS-5",
//     date: "2024-11-09 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Debit",
//     amount: "600545.00",
//     sender: null,
//     receiver: "Tracy Aufderhar",
//     referenceCode: "BNZxW5r16mfFQnrG",
//     accountNumber: "00704194",
//     location: "Saint Lucia",
//     balanceAfterTransaction: "4405664.00",
//   },
//   {
//     id: "TRANS-24",
//     date: "2024-11-09 00:00:00",
//     transactionType: "Mobile Transfer",
//     status: "Debit",
//     amount: "163308.00",
//     sender: null,
//     receiver: "Mann Group",
//     referenceCode: "l0CclMMSxCBKMjC3",
//     accountNumber: "68509155",
//     location: "Guinea-Bissau",
//     balanceAfterTransaction: "11778568.00",
//   },
//   {
//     id: "TRANS-36",
//     date: "2024-11-09 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Debit",
//     amount: "269571.00",
//     sender: null,
//     receiver: "Mattie Feest",
//     referenceCode: "0xVHQnjpCK75k0ox",
//     accountNumber: "00142666",
//     location: "Czechia",
//     balanceAfterTransaction: "11953098.00",
//   },
//   {
//     id: "TRANS-31",
//     date: "2024-11-10 00:00:00",
//     transactionType: "Bank Deposit",
//     status: "Credit",
//     amount: "894500.00",
//     sender: "Rickey Nicolas",
//     receiver: null,
//     referenceCode: "fJIMKye0AKkQNJA9",
//     accountNumber: "46459569",
//     location: "Grenada",
//     balanceAfterTransaction: "12638606.00",
//   },
//   {
//     id: "TRANS-33",
//     date: "2024-11-10 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Debit",
//     amount: "100656.00",
//     sender: null,
//     receiver: "Emmett Becker Jr.",
//     referenceCode: "UBpm9ZxroJ7ActPx",
//     accountNumber: "50655176",
//     location: "India",
//     balanceAfterTransaction: "12240899.00",
//   },
//   {
//     id: "TRANS-78",
//     date: "2024-11-10 00:00:00",
//     transactionType: "Mobile Transfer",
//     status: "Debit",
//     amount: "524649.00",
//     sender: null,
//     receiver: "Ritchie, Kovacek and Koelpin",
//     referenceCode: "Y9O8qE9DhKVFeSEU",
//     accountNumber: "96847936",
//     location: "Pitcairn Islands",
//     balanceAfterTransaction: "12136809.00",
//   },
//   {
//     id: "TRANS-14",
//     date: "2024-11-11 00:00:00",
//     transactionType: "Mobile Transfer",
//     status: "Credit",
//     amount: "1124539.00",
//     sender: "Gulgowski, Nicolas and Koch",
//     receiver: null,
//     referenceCode: "vyD7lMU8Ern9iJ4e",
//     accountNumber: "85557845",
//     location: "Liechtenstein",
//     balanceAfterTransaction: "8729777.00",
//   },
//   {
//     id: "TRANS-15",
//     date: "2024-11-12 00:00:00",
//     transactionType: "Mobile Transfer",
//     status: "Credit",
//     amount: "719750.00",
//     sender: "Hayes, Hauck and Crist",
//     receiver: null,
//     referenceCode: "DAtsMnLmVbUs2fom",
//     accountNumber: "71164986",
//     location: "Bhutan",
//     balanceAfterTransaction: "9449527.00",
//   },
//   {
//     id: "TRANS-23",
//     date: "2024-11-12 00:00:00",
//     transactionType: "Mobile Transfer",
//     status: "Credit",
//     amount: "244055.00",
//     sender: "Jacobs, Ferry and O'Kon",
//     receiver: null,
//     referenceCode: "3Y3FzETIX8GqMQRs",
//     accountNumber: "19463298",
//     location: "Guernsey",
//     balanceAfterTransaction: "11941876.00",
//   },
//   {
//     id: "TRANS-28",
//     date: "2024-11-12 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Debit",
//     amount: "993199.00",
//     sender: null,
//     receiver: "Jakubowski - Bartell",
//     referenceCode: "ruLZFfnzbuQgmTPt",
//     accountNumber: "85692183",
//     location: "Tonga",
//     balanceAfterTransaction: "12387591.00",
//   },
//   {
//     id: "TRANS-58",
//     date: "2024-11-12 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Credit",
//     amount: "479809.00",
//     sender: "Blick Inc",
//     receiver: null,
//     referenceCode: "Z1gAUAsYHpDwoto3",
//     accountNumber: "60979744",
//     location: "Nigeria",
//     balanceAfterTransaction: "12362503.00",
//   },
//   {
//     id: "TRANS-69",
//     date: "2024-11-12 00:00:00",
//     transactionType: "Bank Withdrawal",
//     status: "Debit",
//     amount: "721966.00",
//     sender: null,
//     receiver: "Bobby Towne",
//     referenceCode: "rWAJ6u4cldH0gkjY",
//     accountNumber: "78920562",
//     location: "Bahrain",
//     balanceAfterTransaction: "13019400.00",
//   },
// ];

export interface Transaction {
  id: string;
  date: string;
  transactionType: string;
  status: string;
  amount: string;
  sender: string | null;
  receiver: string | null;
  referenceCode: string;
  accountNumber: string;
  location: string;
  balanceAfterTransaction: string;
}

let transactionData: Transaction[] = [];

async function gettransactionmessges() {
  const data = (await getTransactionsMessages()) ?? [];
  const newTransactionData = [
    ...transactionData,
    ...(data as typeof transactionData),
  ];
  return newTransactionData;
}

// gettransactionmessges();

export type TransactionByDate = {
  [date: string]: Transaction[];
};

// Transform the data into an array of objects grouped by dates, where each key is a date and the value is an array of transactions for that date
export async function getGroupedTransactions() {
  const newTransactionData = await gettransactionmessges();
  const groupedTransactions = newTransactionData
    .reverse()
    .reduce((acc: TransactionByDate, transaction) => {
      const { date } = transaction;
      const dateKey = date.split(" ")[0];

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }

      acc[dateKey].push(transaction);

      return acc;
    }, {} as TransactionByDate);

  return groupedTransactions;
}

// export const groupedTransactions = transactionData
//   .reverse()
//   .reduce((acc: TransactionByDate, transaction) => {
//     const { date } = transaction;
//     const dateKey = date.split(" ")[0];

//     if (!acc[dateKey]) {
//       acc[dateKey] = [];
//     }

//     acc[dateKey].push(transaction);

//     return acc;
//   }, {} as TransactionByDate);

// Custom function to get a date `numDays` ago from today, and optionally include time
function fromToday(numDays: number, withTime = false) {
  const date = add(new Date(), { days: numDays });
  if (!withTime) date.setUTCHours(0, 0, 0, 0); // Reset hours if not with time
  return date.toISOString().slice(0, -1); // Format date as ISO string
}

// Function to generate fresh transaction data if previous data become very old
function generateTransactionData() {
  let totalAmount = 100000000; // Aim for around $100 million in total
  const transactions = [];
  const numTransactions = 80;
  let balance = 5000000; // Starting balance for the account

  const transactionTypes = [
    "Bank Deposit",
    "Bank Withdrawal",
    "Mobile Transfer",
  ];

  for (let i = 0; i < numTransactions; i++) {
    // Generate the transaction amount (a random amount based on remaining budget)
    const amount =
      Math.floor(Math.random() * (totalAmount / numTransactions)) + 50000;

    // Decide if it's a credit or debit
    const isCredit = Math.random() > 0.5;
    const transactionType =
      transactionTypes[Math.floor(Math.random() * transactionTypes.length)];

    // Update balance based on the transaction type
    if (isCredit) {
      balance += amount;
    } else {
      balance -= amount;
    }

    // Randomly decide if the name is a company or individual
    const isCompany = Math.random() > 0.5;
    const name = isCompany ? faker.company.name() : faker.person.fullName();

    // Generate the name, account number, and reference code
    const accountNumber = faker.finance.accountNumber();
    const referenceCode = faker.string.alphanumeric(16);

    // Transaction date within the last 30 days
    const transactionDate = format(
      new Date(fromToday(-Math.floor(Math.random() * 30))), // Get random date within 30 days
      "yyyy-MM-dd HH:mm:ss"
    );

    // Define transaction data
    const transaction = {
      id: `TRANS-${i + 1}`,
      date: transactionDate,
      transactionType,
      status: isCredit ? "Credit" : "Debit",
      amount: amount.toFixed(2),
      sender: isCredit ? name : null,
      receiver: isCredit ? null : name,
      referenceCode,
      accountNumber,
      location: faker.location.country(),
      balanceAfterTransaction: balance.toFixed(2),
    };

    // Add to transactions array and adjust remaining budget
    transactions.push(transaction);
    totalAmount -= amount;
  }

  // Sort transactions by date (ascending) and return the JSON data
  transactions.sort((a, b) => +new Date(a.date) - +new Date(b.date));

  // Return the JSON string of transactions
  // return JSON.stringify(transactions, null, 2);
  transactionData = transactions;
  // return JSON.stringify(transactions, null, 2);
}

// Generate the transaction data and print to console
generateTransactionData();
