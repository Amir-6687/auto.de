// ── این دو تابع رو به آخر userController.js اضافه کن ──

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user || !user.isActive)
      return res.status(401).json({ error: "Invalid credentials" });

    // کاربران Google-only پسورد ندارن
    if (!user.password)
      return res.status(401).json({ error: "Please use Google login" });

    const match = await user.comparePassword(password);
    if (!match)
      return res.status(401).json({ error: "Invalid credentials" });

    res.json({
      id: user._id.toString(),
      email: user.email,
      name: user.name || "",
      role: user.role,
    });
  } catch (err) {
    console.error("loginUser", err);
    res.status(500).json({ error: err.message });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const em = email.toLowerCase().trim();

    const existing = await User.findOne({ email: em });
    if (existing)
      return res.status(409).json({ error: "Email already registered" });

    const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "").toLowerCase();
    const user = await User.create({
      email: em,
      name: name || em.split("@")[0],
      password, // pre-save hook هش میکنه
      role: em === ADMIN_EMAIL ? "admin" : "user",
    });

    res.status(201).json({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (err) {
    console.error("registerUser", err);
    res.status(500).json({ error: err.message });
  }
};