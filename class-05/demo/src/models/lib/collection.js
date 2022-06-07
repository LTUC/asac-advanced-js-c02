class Collection {
    constructor(model) {
        this.model = model;
    }
    //this method will create a record in DB
    async create(obj) {
        try {
            // let newPerson = req.body;
            // let person = await People.create(newPerson);
            // res.status(201).json(person);

            let newRecord = await this.model.create(obj);
            return newRecord;
        } catch (e) {
            console.error("error in creating a new record in model ", this.model)

        }
    }
    async read(data_id) {
        try {
            let record = null;
            //if we send an id that's mean we are searching about one customer
            if (data_id) {
                // const personId = parseInt(req.params.id);
                // let person = await customer.findOne({ where: { id: personId } });
                // res.status(200).json(person);
                record = await this.model.findOne({ where: { id: data_id } });
                return record;
            }
            else {
                // const allCustomer = await customer.findAll();
                // res.status(200).json(allCustomer);
                record = await this.model.findAll();
                return record;
            }

        } catch (e) {
            console.error("error in reading record in model ", this.model)
        }

    }
    async update(obj) {
        try {
            // let record = await this.model.findOne({ where: { id: data_id } });
            let updated = await record.update(obj);
            return updated;
        } catch (e) {
            console.error("error in updating record in model ", this.model)
        }
    }
    async delete(data_id) {
        if (!data_id) {
            throw new Error('no id provided for model ', this.model)
        }
        try {
            let deleted = await this.model.destroy({ where: { id: data_id } });
            return deleted;
        } catch (e) {
            console.error('error in deleting record in model ', this.model);
        }
    }
}

module.exports = Collection;