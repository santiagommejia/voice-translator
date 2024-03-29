export const availableLanguageCodes: string[] = ["hi-IN-translit","he-IL","vi-VN","en-IE","nl-NL","sv-SE","en-ID","en-PH","es-CL","uk-UA","hu-HU","de-AT","wuu-CN","ro-RO","ja-JP","fr-CA","zh-CN","ar-SA","zh-TW","ca-ES","it-IT","zh-HK","en-AU","de-CH","en-AE","ko-KR","fr-BE","en-ZA","fr-CH","ru-RU","el-GR","nb-NO","hr-HR","hi-IN","fi-FI","pt-PT","en-NZ","th-TH","id-ID","es-MX","it-CH","pl-PL","sk-SK","es-419","es-ES","de-DE","nl-BE","fr-FR","en-IN","en-SA","hi-Latn","cs-CZ","da-DK","en-GB","en-US","tr-TR","pt-BR","es-US","en-CA","en-SG","ms-MY","es-CO","yue-CN"];    
 
export function getFlagIconClass(languageCode: string) {
    const defaultFlag = "en"; // Default flag icon class if no mapping is found
    const flagIconClass = languageCodeToFlag.get(languageCode) || defaultFlag;
    return `fi fi-${flagIconClass}`;
}

export function getCountry(languageCode: string) {
    const defaultCountry = "United States"; // Default country if no mapping is found
    const country = languageCodeToCountry.get(languageCode) || defaultCountry;
    return country;
}
 
const languageCodeToFlag = new Map<string, string>([
    ["hi-IN-translit", "in"],
    ["he-IL", "il"],
    ["vi-VN", "vn"],
    ["en-IE", "ie"],
    ["nl-NL", "nl"],
    ["sv-SE", "se"],
    ["en-ID", "id"],
    ["en-PH", "ph"],
    ["es-CL", "cl"],
    ["uk-UA", "ua"],
    ["hu-HU", "hu"],
    ["de-AT", "at"],
    ["wuu-CN", "cn"],
    ["ro-RO", "ro"],
    ["ja-JP", "jp"],
    ["fr-CA", "ca"],
    ["zh-CN", "cn"],
    ["ar-SA", "sa"],
    ["zh-TW", "tw"],
    ["ca-ES", "es"],
    ["it-IT", "it"],
    ["zh-HK", "hk"],
    ["en-AU", "au"],
    ["de-CH", "ch"],
    ["en-AE", "ae"],
    ["ko-KR", "kr"],
    ["fr-BE", "be"],
    ["en-ZA", "za"],
    ["fr-CH", "ch"],
    ["ru-RU", "ru"],
    ["el-GR", "gr"],
    ["nb-NO", "no"],
    ["hr-HR", "hr"],
    ["hi-IN", "in"],
    ["fi-FI", "fi"],
    ["pt-PT", "pt"],
    ["en-NZ", "nz"],
    ["th-TH", "th"],
    ["id-ID", "id"],
    ["es-MX", "mx"],
    ["it-CH", "ch"],
    ["pl-PL", "pl"],
    ["sk-SK", "sk"],
    ["es-419", "es"], // Latin America
    ["es-ES", "es"],
    ["de-DE", "de"],
    ["nl-BE", "be"],
    ["fr-FR", "fr"],
    ["en-IN", "in"],
    ["en-SA", "sa"],
    ["hi-Latn", "in"], // Assuming India for Hindi Latin script
    ["cs-CZ", "cz"],
    ["da-DK", "dk"],
    ["en-GB", "gb"],
    ["en-US", "us"],
    ["tr-TR", "tr"],
    ["pt-BR", "br"],
    ["es-US", "us"],
    ["en-CA", "ca"],
    ["en-SG", "sg"],
    ["ms-MY", "my"],
    ["es-CO", "co"],
    ["yue-CN", "cn"],
]);

const languageCodeToCountry = new Map<string, string>([
    ["hi-IN-translit", "🇮🇳 India"],
    ["he-IL", "🇮🇱 Israel"],
    ["vi-VN", "🇻🇳 Vietnam"],
    ["en-IE", "🇮🇪 Ireland"],
    ["nl-NL", "🇳🇱 Netherlands"],
    ["sv-SE", "🇸🇪 Sweden"],
    ["en-ID", "🇮🇩 Indonesia"],
    ["en-PH", "🇵🇭 Philippines"],
    ["es-CL", "🇨🇱 Chile"],
    ["uk-UA", "🇺🇦 Ukraine"],
    ["hu-HU", "🇭🇺 Hungary"],
    ["de-AT", "🇦🇹 Austria"],
    ["wuu-CN", "🇨🇳 China (Wu Chinese)"],
    ["ro-RO", "🇷🇴 Romania"],
    ["ja-JP", "🇯🇵 Japan"],
    ["fr-CA", "🇨🇦 Canada (French)"],
    ["zh-CN", "🇨🇳 China (Mandarin)"],
    ["ar-SA", "🇸🇦 Saudi Arabia"],
    ["zh-TW", "🇹🇼 Taiwan"],
    ["ca-ES", "🇪🇸 Catalonia (Spain)"],
    ["it-IT", "🇮🇹 Italy"],
    ["zh-HK", "🇭🇰 Hong Kong"],
    ["en-AU", "🇦🇺 Australia"],
    ["de-CH", "🇨🇭 Switzerland (German)"],
    ["en-AE", "🇦🇪 United Arab Emirates"],
    ["ko-KR", "🇰🇷 South Korea"],
    ["fr-BE", "🇧🇪 Belgium (French)"],
    ["en-ZA", "🇿🇦 South Africa"],
    ["fr-CH", "🇨🇭 Switzerland (French)"],
    ["ru-RU", "🇷🇺 Russia"],
    ["el-GR", "🇬🇷 Greece"],
    ["nb-NO", "🇳🇴 Norway"],
    ["hr-HR", "🇭🇷 Croatia"],
    ["hi-IN", "🇮🇳 India"],
    ["fi-FI", "🇫🇮 Finland"],
    ["pt-PT", "🇵🇹 Portugal"],
    ["en-NZ", "🇳🇿 New Zealand"],
    ["th-TH", "🇹🇭 Thailand"],
    ["id-ID", "🇮🇩 Indonesia"],
    ["es-MX", "🇲🇽 Mexico"],
    ["it-CH", "🇨🇭 Switzerland (Italian)"],
    ["pl-PL", "🇵🇱 Poland"],
    ["sk-SK", "🇸🇰 Slovakia"],
    ["es-419", "🌎 Latin America (Spanish)"],
    ["es-ES", "🇪🇸 Spain"],
    ["de-DE", "🇩🇪 Germany"],
    ["nl-BE", "🇧🇪 Belgium (Dutch)"],
    ["fr-FR", "🇫🇷 France"],
    ["en-IN", "🇮🇳 India"],
    ["en-SA", "🇸🇦 Saudi Arabia"],
    ["hi-Latn", "🌏 Latin script for Hindi"],
    ["cs-CZ", "🇨🇿 Czech Republic"],
    ["da-DK", "🇩🇰 Denmark"],
    ["en-GB", "🇬🇧 United Kingdom"],
    ["en-US", "🇺🇸 United States"],
    ["tr-TR", "🇹🇷 Turkey"],
    ["pt-BR", "🇧🇷 Brazil"],
    ["es-US", "🇺🇸 United States (Spanish)"],
    ["en-CA", "🇨🇦 Canada"],
    ["en-SG", "🇸🇬 Singapore"],
    ["ms-MY", "🇲🇾 Malaysia"],
    ["es-CO", "🇨🇴 Colombia"],
    ["yue-CN", "🇨🇳 China (Cantonese)"],
  ]);