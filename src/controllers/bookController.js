const {Book} = require('../models')
/**
 * Controller responsável pelas operações de CRUD de livros.
 * @module controllers/bookController
 */

const getAllBooks = async (req,res) =>{
    try{
        const books = await Book.findAll();
        res.json(books);
    }catch(error){

        res.status(500).json({error: error.message});
    }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: 'Livro não encontrado' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBook = async (req,res) => {
    try{
        const book = await Book.create(req.body);
        res.status(201).json(book)
    }catch(error){
        res.status(400).json({error: error.message})
    }
};

const updateBook = async (req,res) =>{
    try {
        const book = await Book.findByPk(req.params.id);
        if(!book) return res.status(404).json({error: 'Livro não encontrado bb'});
        await book.update(req.body);
        res.json(book)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book)
            return res.status(404).json({error: 'livro não encontrado'}); 
            await book.destroy();
            res.status(204).send();
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};

module.exports = {getAllBooks, getBookById, createBook, updateBook, deleteBook};


