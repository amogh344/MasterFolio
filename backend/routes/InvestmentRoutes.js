// import express from 'express';
// import Investment from '../models/InvestmentModel.js';

// const router = express.Router();

// // @route   GET /api/investments
// // @desc    Get all investments with optional filters
// // @access  Public
// router.get('/', async (req, res) => {
//   try {
//     const { type, sort, tags } = req.query;
//     let query = {};

//     if (type) query.type = type;
//     if (tags) query.tags = { $in: tags.split(',') };

//     let sortObj = {};
//     if (sort) {
//       const [field, order] = sort.split(':');
//       sortObj[field] = order === 'desc' ? -1 : 1;
//     } else {
//       sortObj = { createdAt: -1 };
//     }

//     const investments = await Investment.find(query).sort(sortObj);
//     res.json(investments);
//   } catch (err) {
//     console.error('Error fetching investments:', err);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// });

// // @route   POST /api/investments
// // @desc    Add a new investment
// // @access  Public
// router.post('/', async (req, res) => {
//   try {
//     const { name, symbol, quantity, type } = req.body;

//     if (!name && !symbol) {
//       return res.status(400).json({ message: 'Provide either name or symbol' });
//     }
//     if (!quantity || !type) {
//       return res.status(400).json({ message: 'Please provide all required fields' });
//     }

//     const quantityNum = parseFloat(quantity);
//     if (isNaN(quantityNum) || quantityNum <= 0) {
//       return res.status(400).json({ message: 'Invalid quantity' });
//     }

//     const newInvestment = new Investment({
//       name,
//       symbol,
//       quantity: quantityNum,
//       type
//     });

//     const savedInvestment = await newInvestment.save();
//     res.json(savedInvestment);
//   } catch (err) {
//     console.error('Error saving investment:', err);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// });

// // @route   PUT /api/investments/:id
// // @desc    Update an existing investment
// // @access  Public
// router.put('/:id', async (req, res) => {
//   try {
//     const { name, symbol, quantity, type } = req.body;

//     if (!name && !symbol) {
//       return res.status(400).json({ message: 'Provide either name or symbol' });
//     }
//     if (!quantity || !type) {
//       return res.status(400).json({ message: 'Please provide all required fields' });
//     }

//     const quantityNum = parseFloat(quantity);
//     if (isNaN(quantityNum) || quantityNum <= 0) {
//       return res.status(400).json({ message: 'Invalid quantity' });
//     }

//     const updatedInvestment = await Investment.findByIdAndUpdate(
//       req.params.id,
//       {
//         name,
//         symbol,
//         quantity: quantityNum,
//         type
//       },
//       { new: true }
//     );

//     if (!updatedInvestment) {
//       return res.status(404).json({ message: 'Investment not found' });
//     }

//     res.json(updatedInvestment);
//   } catch (err) {
//     console.error('Error updating investment:', err);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// });

// // @route   DELETE /api/investments/:id
// // @desc    Delete an investment
// // @access  Public
// router.delete('/:id', async (req, res) => {
//   try {
//     const investment = await Investment.findByIdAndDelete(req.params.id);

//     if (!investment) {
//       return res.status(404).json({ message: 'Investment not found' });
//     }

//     res.json({ message: 'Investment removed', investment });
//   } catch (err) {
//     console.error('Error deleting investment:', err);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// });

// export default router;



import express from 'express';
import Investment from '../models/InvestmentModel.js';

const router = express.Router();

// @route   GET /api/investments
// @desc    Get all investments with optional filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { type, sort, tags } = req.query;
    let query = {};

    if (type) query.type = type;
    if (tags) query.tags = { $in: tags.split(',') };

    let sortObj = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortObj[field] = order === 'desc' ? -1 : 1;
    } else {
      sortObj = { createdAt: -1 };
    }

    const investments = await Investment.find(query).sort(sortObj);
    res.json(investments);
  } catch (err) {
    console.error('Error fetching investments:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// @route   POST /api/investments
// @desc    Add a new investment
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, symbol, quantity, type, price } = req.body;

    if ((!name && !symbol) || !quantity || !type || price === undefined) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const quantityNum = parseFloat(quantity);
    const priceNum = parseFloat(price);

    if (isNaN(quantityNum) || quantityNum <= 0) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }

    if (isNaN(priceNum) || priceNum <= 0) {
      return res.status(400).json({ message: 'Invalid price' });
    }

    const newInvestment = new Investment({
      name,
      symbol,
      quantity: quantityNum,
      type,
      price: priceNum
    });

    const savedInvestment = await newInvestment.save();
    res.json(savedInvestment);
  } catch (err) {
    console.error('Error saving investment:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// @route   PUT /api/investments/:id
// @desc    Update an existing investment
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const { name, symbol, quantity, type, price } = req.body;

    if ((!name && !symbol) || !quantity || !type || price === undefined) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const quantityNum = parseFloat(quantity);
    const priceNum = parseFloat(price);

    if (isNaN(quantityNum) || quantityNum <= 0) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }

    if (isNaN(priceNum) || priceNum <= 0) {
      return res.status(400).json({ message: 'Invalid price' });
    }

    const updatedInvestment = await Investment.findByIdAndUpdate(
      req.params.id,
      {
        name,
        symbol,
        quantity: quantityNum,
        type,
        price: priceNum
      },
      { new: true }
    );

    if (!updatedInvestment) {
      return res.status(404).json({ message: 'Investment not found' });
    }

    res.json(updatedInvestment);
  } catch (err) {
    console.error('Error updating investment:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// @route   DELETE /api/investments/:id
// @desc    Delete an investment
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const investment = await Investment.findByIdAndDelete(req.params.id);

    if (!investment) {
      return res.status(404).json({ message: 'Investment not found' });
    }

    res.json({ message: 'Investment removed', investment });
  } catch (err) {
    console.error('Error deleting investment:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

export default router;
