import { NextResponse } from "next/server";
import { OpenAI } from "openai";
// import { process } from "../../env.js";


// const openai = new OpenAI({
//   apiKey: process.apikey,
// });

const apiKey = process.env.OPENAI_KEY

const openai = new OpenAI({
  apiKey: apiKey,
});

if (!openai.apiKey) {
  throw new Error("No API key found");
}

export async function POST(request) {
  const body = await request.json();
  if (!body.prompt) {
    return NextResponse.error(new Error("No prompt found"), { status: 400 });
  }

  try {
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `Genera una descripción general de la información nutricional de un alimento específico. la información debe
      estar organizada como una etiqueta de información nutricional.

    ###
        alimento: arroz.

        información nutricional: El arroz es un alimento básico consumido en todo el mundo y es una excelente fuente de energía en forma de carbohidratos.

        Tamaño de la porción: 1 taza cocida (aproximadamente 195 g)

        Energía:

        Calorías: Alrededor de 205 kcal

        Carbohidratos:

        Carbohidratos totales: Aproximadamente 45 g
        Fibra dietética: Alrededor de 0.6 g
        Azúcares: Menos de 1 g

        Proteínas:

        Proteínas: Aproximadamente 4 g

        Grasas:

        Grasas totales: Alrededor de 0.4 g
        Grasas saturadas: Menos de 0.1 g
        Grasas trans: 0 g

        Vitaminas y Minerales:

        Vitamina B1 (Tiamina): Contribuye al metabolismo energético.
        Vitamina B3 (Niacina): Importante para el funcionamiento celular.
        Folato: Contribuye a la formación de células sanguíneas y al ADN.
        Hierro: Esencial para el transporte de oxígeno en la sangre.
        Magnesio: Importante para la función muscular y nerviosa.
        Selenio: Tiene funciones antioxidantes.

        Es importante tener en cuenta que estos valores son aproximados y pueden variar según la marca y el método de cocción del arroz.
    ###
        alimento: coca cola.
        información nutricional: Es una de las bebidas más populares en todo el mundo.
        Tamaño de la porción: 1 lata (355 ml)

        Energía:

        Calorías: Alrededor de 140 kcal
        Carbohidratos:

        Carbohidratos totales: Aproximadamente 39 g
        Azúcares: Alrededor de 39 g
        Proteínas:

        Proteínas: 0 g
        Grasas:

        Grasas totales: 0 g
        Grasas saturadas: 0 g
        Sodio:

        Sodio: Alrededor de 45 mg
        Ten en cuenta que esta información puede variar según la región y el tipo específico de Coca-Cola (regular, diet, zero, etc.).
    ###
        alimento: ${body.prompt}
        información nutricional:
    `,
      max_tokens: 300,
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.error(error, { status: 500 });
  }
}
