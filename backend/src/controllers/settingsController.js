const SiteSettings = require("../models/SiteSettings");

exports.get = async (req, res) => {
  try {
    let s = await SiteSettings.findOne({ key: "default" });
    if (!s) s = await SiteSettings.create({ key: "default" });
    res.json(s);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const allowed = [
      "logoUrl",
      "contactEmail",
      "contactPhone",
      "themePrimary",
      "themeAccent",
      "footerText",
      "metaTitle",
      "metaDescription",
    ];
    const data = {};
    for (const k of allowed) {
      if (req.body[k] !== undefined) data[k] = req.body[k];
    }
    const s = await SiteSettings.findOneAndUpdate({ key: "default" }, data, {
      upsert: true,
      new: true,
    });
    res.json(s);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
