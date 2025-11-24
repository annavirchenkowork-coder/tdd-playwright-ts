import { readFileSync } from "fs";
import path from "path";
import { faker } from "@faker-js/faker";

/**
 * Interface defining the structure of price data
 */
export interface PriceData {
  active: boolean;
  baseAmount: number;
  type: string;
  upfrontDiscount: boolean;
  upfrontDiscountAmount: number;
  allowCoupons: boolean;
  couponDiscount: number;
  numberOfInstallments?: number;
}

/**
 * Class representing a price option for a product
 */
export class Price {
  active: boolean;
  baseAmount: number;
  type: string;
  upfrontDiscount: boolean;
  upfrontDiscountAmount: number;
  allowCoupons: boolean;
  couponDiscount: number;
  numberOfInstallments: number | null;

  /**
   * Constructs a Price instance
   * @param priceData - Object containing price information
   */
  constructor({
    active,
    baseAmount,
    type,
    upfrontDiscount,
    upfrontDiscountAmount,
    allowCoupons,
    couponDiscount,
    numberOfInstallments,
  }: PriceData) {
    this.active = active;
    this.baseAmount = baseAmount;
    this.type = type;
    this.upfrontDiscount = upfrontDiscount;
    this.upfrontDiscountAmount = upfrontDiscountAmount;
    this.allowCoupons = allowCoupons;
    this.couponDiscount = couponDiscount;
    this.numberOfInstallments = numberOfInstallments ?? null;
  }
}

/**
 * Interface defining the structure of product data
 */
export interface ProductData {
  available: boolean;
  productName: string;
  productId: string;
  teen: boolean;
  type: string;
  programId: number; // in JSON it's a number (56)
  programCode: string;
  programName: string;
  startDate: string;
  refundDate: string;
  externalUrl: string;
  terms: string;
  prices: PriceData[];
}

/**
 * Class representing a product
 */
export class Product {
  available: boolean;
  productName: string;
  productId: string;
  teen: boolean;
  type: string;
  programId: number;
  programCode: string;
  programName: string;
  startDate: string;
  refundDate: string;
  externalUrl: string;
  terms: string;
  prices: Price[];

  /**
   * Constructs a Product instance
   * @param productData - Object containing product information
   */
  constructor({
    available,
    productName,
    productId,
    teen,
    type,
    programId,
    programCode,
    programName,
    startDate,
    refundDate,
    externalUrl,
    terms,
    prices,
  }: ProductData) {
    this.available = available;
    this.productName = productName;
    this.productId = productId;
    this.teen = teen;
    this.type = type;
    this.programId = programId;
    this.programCode = programCode;
    this.programName = programName;
    this.startDate = startDate;
    this.refundDate = refundDate;
    this.externalUrl = externalUrl;
    this.terms = terms;
    this.prices = prices.map((price) => new Price(price));
  }
}

/**
 * Load QA data from JSON (once)
 */
const dataPath = path.resolve("data/qa_data.json");
const rawData = readFileSync(dataPath, "utf8");

/**
 * Raw parsed JSON data from qa_data.json
 */
export const qaData: ProductData = JSON.parse(rawData) as ProductData;

/**
 * Strongly-typed Product instance created from qa_data.json
 */
export const productInfo = new Product(qaData);

/**
 * Interface for generated test user
 */
export interface TestUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  howDidYouHear: string;
}

/**
 * Generates a random test user using faker.
 * Can be used in TDD tests when you want fresh data per run.
 */
export function generateTestUser(): TestUser {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email({ provider: "example.com" }),
    phone: faker.string.numeric(10),
    howDidYouHear: "LinkedIn",
  };
}

/**
 * Interface for default enrollment data
 */
export interface EnrollmentData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  howDidYouHear: string;
  startDate: string;
  refundDate: string;
}

/**
 * Default user + date info based on qaData.
 * Useful when you want stable, non-random data.
 */
export const defaultEnrollmentData: EnrollmentData = {
  firstName: "Anna",
  lastName: "Virchenko",
  email: "anna.virchenko@example.com",
  phone: "5551234567",
  howDidYouHear: "Email",
  startDate: qaData.startDate,
  refundDate: qaData.refundDate,
};

/**
 * Convenient helpers for price lookup
 */
export const upfrontPrice: Price | undefined = productInfo.prices.find(
  (p) => p.type === "one-time"
);

export const installmentsPrice: Price | undefined = productInfo.prices.find(
  (p) => p.type === "recurring"
);