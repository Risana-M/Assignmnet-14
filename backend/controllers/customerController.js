import Customer from "../models/Customer.js";

// GET Customers (only logged-in user)
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ userId: req.user.id });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ADD Customer
export const addCustomer = async (req, res) => {
  try {
    const newCustomer = await Customer.create({
      ...req.body,
      userId: req.user.id
    });

    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE Customer (only if belongs to user)
export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const updated = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE Customer (only if belongs to user)
export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    await customer.deleteOne();

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};