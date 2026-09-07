export const YEARS = Array.from({ length: 11 }, (_, i) => 2026 - i);

export const MODELS: Record<string, string[]> = {
  Acura: ["ILX", "Integra", "MDX", "RDX", "TLX"],
  Audi: ["A3", "A4", "A5", "A6", "Q3", "Q5", "Q7", "Q8"],
  BMW: ["2 Series", "3 Series", "4 Series", "5 Series", "X1", "X3", "X5", "X7"],
  Buick: ["Enclave", "Encore", "Envision"],
  Cadillac: ["CT4", "CT5", "Escalade", "XT4", "XT5", "XT6"],
  Chevrolet: ["Camaro", "Colorado", "Equinox", "Malibu", "Silverado", "Suburban", "Tahoe", "Traverse"],
  Chrysler: ["300", "Pacifica", "Voyager"],
  Dodge: ["Challenger", "Charger", "Durango", "Hornet"],
  Ford: ["Bronco", "Edge", "Escape", "Expedition", "Explorer", "F-150", "Mustang", "Ranger"],
  GMC: ["Acadia", "Canyon", "Sierra", "Terrain", "Yukon"],
  Genesis: ["G70", "G80", "GV70", "GV80"],
  Honda: ["Accord", "Civic", "CR-V", "HR-V", "Odyssey", "Passport", "Pilot", "Ridgeline"],
  Hyundai: ["Elantra", "Ioniq 5", "Kona", "Palisade", "Santa Fe", "Sonata", "Tucson"],
  Infiniti: ["Q50", "QX50", "QX60", "QX80"],
  Jeep: ["Cherokee", "Compass", "Gladiator", "Grand Cherokee", "Wrangler"],
  Kia: ["Carnival", "Forte", "K5", "Sorento", "Soul", "Sportage", "Telluride"],
  Lexus: ["ES", "GX", "IS", "NX", "RX", "TX", "UX"],
  Lincoln: ["Aviator", "Corsair", "Nautilus", "Navigator"],
  Mazda: ["CX-30", "CX-5", "CX-50", "CX-90", "Mazda3", "Mazda6"],
  "Mercedes-Benz": ["A-Class", "C-Class", "E-Class", "GLA", "GLC", "GLE", "GLS"],
  Nissan: ["Altima", "Armada", "Frontier", "Kicks", "Murano", "Pathfinder", "Rogue", "Sentra", "Titan"],
  Ram: ["1500", "2500", "3500"],
  Subaru: ["Ascent", "Crosstrek", "Forester", "Impreza", "Outback", "WRX"],
  Tesla: ["Cybertruck", "Model 3", "Model S", "Model X", "Model Y"],
  Toyota: ["4Runner", "Camry", "Corolla", "Highlander", "Prius", "RAV4", "Sequoia", "Sienna", "Tacoma", "Tundra"],
  Volkswagen: ["Atlas", "Golf", "ID.4", "Jetta", "Taos", "Tiguan"],
  Volvo: ["S60", "S90", "XC40", "XC60", "XC90"],
  Other: ["Other / not listed"],
};

export const MAKES = Object.keys(MODELS);
