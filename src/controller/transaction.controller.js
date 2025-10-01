import { createTransactionSchema, updateTransactionSchema } from "../dto/transaction-request.dto.js";
import { toTransactionResponse, toTransactionListResponse } from "../dto/transaction-response.dto.js";

export default class TransactionController {
    constructor(transactionService) {
        this.transactionService = transactionService;
    }

    create = async (req, res, next) => {
        try {
            const { error, value } = createTransactionSchema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({ error: error.details.map(d => d.message) });
            }
            const transaction = await this.transactionService.createTransaction(value);
            res.status(201).json(toTransactionResponse(transaction));
        } catch (err) {
            next(err);
        }
    }

    getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const transaction = await this.transactionService.getTransactionById(parseInt(id));
            if (!transaction) {
                return res.status(404).json({ error: "Transaction not found" });
            }
            res.status(200).json(toTransactionResponse(transaction));
        } catch (err) {
            next(err);
        }
    }

    getAll = async (req, res, next) => {
        try {
            const transactions = await this.transactionService.getAllTransactions();
            res.status(200).json(toTransactionListResponse(transactions));
        } catch (err) {
            next(err);
        }
    }

    getByBusiness = async (req, res, next) => {
        try {
            const userId = req.user.id;
            const { businessId } = req.query;
            const { startDate, endDate, categoryId } = req.query;

            if (!businessId) {
                return res.status(400).json({ error: "businessId is required as a query parameter" });
            }

            const transactions = await this.transactionService.getTransactionsByBusiness(Number(businessId), userId, startDate, endDate, parseInt(categoryId));
            res.status(200).json(toTransactionListResponse(transactions));
        } catch (err) {
            next(err);
        }
    }

    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { error, value } = updateTransactionSchema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({ error: error.details.map(d => d.message) });
            }
            const transaction = await this.transactionService.updateTransaction(parseInt(id), value);
            res.status(200).json(toTransactionResponse(transaction));
        } catch (err) {
            next(err);
        }
    }

    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.transactionService.deleteTransaction(parseInt(id));
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}
