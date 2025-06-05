import { SearchHotelFilterType } from "../shared/types";

/**
 * Constructs a filter object that can be used for searching hotels.
 * @param queryParams - query parameters(req.query), coming from frontend URL
 * @returns filter object
 */
export const constructSearchHotelFilter = (
  queryParams: any
): SearchHotelFilterType => {
  let filterObj: SearchHotelFilterType = {}; // if nothing is coming from req.query then filterObj will be {}, which will search for all documents.
  const {
    destination,
    maxPrice,
    adultCount,
    childCount,
    facilities,
    type,
    starRating,
  } = queryParams;

  if (destination) {
    const cityRegEx = new RegExp(destination, "i");
    filterObj.city = { $regex: cityRegEx };
  }
  if (maxPrice) {
    filterObj.pricePerNight = { $lte: maxPrice };
  }
  if (adultCount) {
    filterObj.adultCount = adultCount;
  }
  if (childCount) {
    filterObj.childCount = childCount;
  }
  if (facilities) {
    filterObj.facilities = Array.isArray(facilities)
      ? { $all: facilities }
      : { $all: [facilities] };
  }
  if (type) {
    filterObj.type = Array.isArray(type) ? { $in: type } : { $in: [type] };
  }
  if (starRating) {
    filterObj.starRating = Array.isArray(starRating)
      ? { $in: starRating }
      : { $in: [starRating] };
  }
  return filterObj;
};

/**
 * Creates an option object for sorting (only for number type fields)
 * @param sortQueryParam - sort query parameter (req.query.sort), coming from frontend URL
 * @returns sort option object
 */
export const createSortOption = (sortQueryParam: string) => {
  // pricePerNight/-pricePerNight/adultCount/-adultCount/childCount/-childCount/starRating/-starRating
  let sortOption;
  const sortField = sortQueryParam.startsWith("-")
    ? sortQueryParam.slice(1)
    : sortQueryParam;
  const sortOrder: 1 | -1 = sortQueryParam.startsWith("-") ? -1 : 1; // descending/ascending
  sortOption = { [sortField]: sortOrder };
  return sortOption;
};
