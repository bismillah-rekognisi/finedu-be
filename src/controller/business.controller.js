import { createBusinessSchema, updateBusinessSchema } from "../dto/business-request.dto.js";
import { toBusinessResponse, toBusinessListResponse } from "../dto/business-response.dto.js";

export default class BusinessController {
    constructor(businessService) {
        this.businessService = businessService;
    }

    create = async (req, res, next) => {
        try {
            const { error, value } = createBusinessSchema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({ error: error.details.map(d => d.message) });
            }
            const business = await this.businessService.createBusiness(value);
            res.status(201).json(toBusinessResponse(business));
        } catch (error) {
            next(error);
        }
    }

    getAll = async (req, res, next) => {
        try {
            const businesses = await this.businessService.getAllBusinesses();
            res.status(200).json(toBusinessListResponse(businesses));
        } catch (error) {
            next(error);
        }
    }

    getByUser = async (req, res, next) => {
        try {
            const {id} = req.user;
            const businesses = await this.businessService.getBusinessesByUserId(id);
            res.status(200).json(toBusinessListResponse(businesses));
        } catch (error) {
            next(error);
        }
    }

    getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const business = await this.businessService.getBusinessById(parseInt(id));
            res.status(200).json(toBusinessResponse(business));
        } catch (error) {
            next(error);
        }
    }

    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { error, value } = updateBusinessSchema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({ error: error.details.map(d => d.message) });
            }
            const business = await this.businessService.updateBusiness(parseInt(id), value);
            res.status(200).json(toBusinessResponse(business));
        } catch (error) {
            next(error);
        }
    }

    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.businessService.deleteBusiness(parseInt(id));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
