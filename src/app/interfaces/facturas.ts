import { CONTRATO } from "./contrato";

export interface FACTURAS {
    "estadoPago": [];
    "createdAt": string;
    "updatedAt": string;
    "id": string;
    "numeroFactura": number;
    "facturasAtrasadas": number;
    "fechaGenerada": string;
    "fechaGeneradaFormat": string;
    "fechaCorte": string;
    "fechaMaximaCorte": string;
    "estado": string;
    "valorIva": number;
    "valorTotal": number;
    "valorRestante": number;
    "valorApagar": number;
    "detalle": string;
    "respuestaServer": string;
    "idContrato": CONTRATO;
};