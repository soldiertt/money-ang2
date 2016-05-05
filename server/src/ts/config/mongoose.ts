import config from "./config";
import * as mongoose        from "mongoose";
import categorySchema       from "../model/category.srv.model";
import txrefSchema          from "../model/txref.srv.model";
import accountSettingSchema from "../model/account-setting.srv.model";
import preferenceSchema     from "../model/preference.srv.model";
import ruleSchema           from "../model/rule.srv.model";
import filterPresetSchema   from "../model/filter-preset.srv.model";

export default function() {
    console.log(config().db);
    let db = mongoose.connect(config().db);
    mongoose.model("Category", categorySchema);
    mongoose.model("Txref", txrefSchema);
    mongoose.model("AccountSetting", accountSettingSchema);
    mongoose.model("Preference", preferenceSchema);
    mongoose.model("Rule", ruleSchema);
    mongoose.model("FilterPreset", filterPresetSchema);
    return db;
};
