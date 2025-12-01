export interface MapplsAutosuggestResult {
  // JSON: "suggestedLocations"
  suggestedLocations: MapplsAutosuggestResult.SuggestedLocation[];

  // JSON: "userAddedLocation"
  userAddedLocation: MapplsAutosuggestResult.UserAddedLocation[];

  // JSON: "suggestedSearches"
  suggestedSearches: MapplsAutosuggestResult.SuggestedSearch[];

  // JSON: "lang"
  lang: string | null;
}

export namespace MapplsAutosuggestResult {
  export interface SuggestedLocation {
    type: string;
    // public int? typeX { get; set; }          // sometimes present as number (commented in C#)
    // If you need it later uncomment and make optional: typeX?: number | null;
    //public string placeAddress { get; set; }
    placeAddress: string;
    //public string eLoc { get; set; }
    eLoc: string;
    //public string placeName { get; set; }
    placeName: string;
    //public string alternateName { get; set; }
    alternateName: string;
    //public List<string> keywords { get; set; } = new();  // commented in C# - uncomment if needed
    //keywords?: string[];
    //public AddressTokens addressTokens { get; set; } = new(); // commented in C#
    //addressTokens?: AddressTokens;
    //public int? p { get; set; }
    //p?: number | null;
    //public int orderIndex { get; set; }
    //orderIndex?: number;
    //public double? score { get; set; }
    //score?: number | null;
    //public string suggester { get; set; }
    //suggester?: string;
    //public string richInfo { get; set; }
    //richInfo?: string | null;
    //public int? distance { get; set; } // older responses had distance; keep nullable
    //distance?: number | null;
  }

  export interface AddressTokens {
    houseNumber: string;
    houseName: string;
    poi: string;
    street: string;
    subSubLocality: string;
    subLocality: string;
    locality: string;
    village: string;
    subDistrict: string;
    district: string;
    city: string;
    state: string;
    pincode: string;
  }

  export interface UserAddedLocation {
    eLoc: string;
    orderIndex: number;
    placeAddress: string;
    placeName: string;
    resultType: string;
    type: string;
    userName: string;
  }

  export interface SuggestedSearch {
    keyword: string;
    identifier: string;
    location: string;
    hyperlink: string;
    orderIndex: number;
    eLoc: string;
  }
}