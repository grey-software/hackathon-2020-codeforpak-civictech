interface DebitCreditParty{
    key: string;
    value: string;
}

export class Payments{

    public static Amount : string = "amount";
    public static Currency : string = "currency";
    public static Type : string = "type";
    public static TransactionStatus  : string = "transactionStatus";
    public static RequestDate  : string = "requestDate";
    public static TransactionReference   : string = "transactionReference";
    public static DebitParty   : string = "debitParty";
    public static CreditParty   : string = "creditParty";

    private amount : string;
    private currency : string;
    private type : string;
    private subType : string;
    private requestDate : string;
    private debitParty? : DebitCreditParty;
    private creditParty? : DebitCreditParty;

    public constructor(amount: string, currency = "PKR", type = "transfer", subType = "Bank", requestDate: string, debitParty?: DebitCreditParty, creditParty?:DebitCreditParty) 
    {
        this.amount = amount;
        this.currency = currency;
        this.type = type;
        this.subType = subType;
        this.requestDate = subType;
        this.debitParty = debitParty;
        this.creditParty = creditParty;
    }

    set Amount( amount : string){
        this.amount = amount;
    }

    set Currency( currency : string){
        this.currency = currency;
    }

    set Type( type : string){
        this.type = type;
    }

    set SubType( subType : string){
        this.subType = subType;
    }

    set RequestDate( requestDate : string){
        this.requestDate = requestDate;
    }

    set DebitParty( dbtParty : DebitCreditParty){
        this.debitParty = dbtParty;
    }

    set CreditParty( cdtParty : DebitCreditParty){
        this.creditParty = cdtParty;
    }

    get Amount(): string{
        return this.amount;
    }

    get Currency(): string{
        return this.currency;
    }

    get Type(): string{
        return this.type;
    }

    get SubType(): string{
        return this.subType;
    }

    get RequestDate(): string{
        return this.requestDate;
    }

}