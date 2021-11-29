
const Got = require("../models/Got.model");

const HTTPSTATUSCODE = require("../../utils/httpStatusCode");



const getAllGots = async (req, res, next) => {
  try {
    if (req.query.page) { 
      const page = parseInt(req.query.page);
      const skip = (page - 1) * 20;
      const gots = await Got.find().skip(skip).limit(20);
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { gots: gots },
      });
    } else {
      const gots = await Got.find();
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { gots: gots },
      });
    }
  } catch (err) {
    return next(err);
  }
};

const getGotById = async (req, res, next) => {
  try {
    const { gotId } = req.params;
    const gotById = await Got.findById(gotId);
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: { gots: gotById }
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getAllGots,
  getGotById,
}