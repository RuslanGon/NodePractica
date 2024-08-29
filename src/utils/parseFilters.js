const parseIntFilter = (unknown) => {
if(typeof unknown !== 'string')return;
const parsedIn = parseInt(unknown);
if(Number.isNaN(parsedIn))return;
return parsedIn;
};

const parseFloatFilter = (unknown) => {
    if(typeof unknown !== 'string')return;
    const parseFload = parseFloat(unknown);
    if(Number.isNaN(parseFload))return;
    return parseFload;
    };

    const parseGenderFilter = (unknown) => {
      if (['male', 'female', 'other'].includes(unknown)) return unknown;
    };

    const parseOnDutyFilter = (unknown) => {
      if (!['true', 'false'].includes(unknown)) return;
      return unknown === 'true' ? true : false;
    };

export const parseFilters = (query) => {
  return {
    minAge: parseIntFilter(query.minAge),
    maxAge: parseIntFilter(query.maxAge),
    minAvgMark: parseFloatFilter(query.minAvgMark),
    maxAvgMark: parseFloatFilter(query.maxAvgMark),
    gender: parseGenderFilter(query.gender) ,
    onDuty: parseOnDutyFilter(query.onDuty)
  };
};
