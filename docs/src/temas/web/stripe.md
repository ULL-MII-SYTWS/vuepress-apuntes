# Stripe: Payment Plataform

See the [Quickstart Guide](https://stripe.com/docs/development/quickstart?lang=node)  

![stripe payments](/images/stripe_payments2.png)

## Stripe CLI

Stripe CLI is a command-line tool that makes it easy to test and develop your Stripe integration locally. It can also be used to manage your Stripe account from the command line.

### Install

```
➜  explorers-up-and-running-with-serverless-functions git:(main) brew install stripe/stripe-cli/stripe
``` 

### Login

```
➜  explorers-up-and-running-with-serverless-functions git:(main) stripe login
```

### Create a product

```json
➜  explorers-up-and-running-with-serverless-functions git:(main) stripe products create \
--name="My First Product" \
--description="Created with the Stripe CLI"
{
  "id": "prod_Mx0L6MowMq57SS",
  "object": "product",
  "active": true,
  "attributes": [],
  "created": 1670591402,
  "default_price": null,
  "description": "Created with the Stripe CLI",
  "images": [],
  "livemode": false,
  "metadata": {},
  "name": "My First Product",
  "package_dimensions": null,
  "shippable": null,
  "statement_descriptor": null,
  "tax_code": null,
  "type": "service",
  "unit_label": null,
  "updated": 1670591402,
  "url": null
}
```

### Create a price

```json
➜  explorers-up-and-running-with-serverless-functions git:(main) stripe prices create \
  --unit-amount=3000 \
  --currency=usd \
  --product="prod_Mx0L6MowMq57SS"
{
  "id": "price_1MD6OBGnlvMtQ0hOt5Jf0r1l",
  "object": "price",
  "active": true,
  "billing_scheme": "per_unit",
  "created": 1670591599,
  "currency": "usd",
  "custom_unit_amount": null,
  "livemode": false,
  "lookup_key": null,
  "metadata": {},
  "nickname": null,
  "product": "prod_Mx0L6MowMq57SS",
  "recurring": null,
  "tax_behavior": "unspecified",
  "tiers_mode": null,
  "transform_quantity": null,
  "type": "one_time",
  "unit_amount": 3000,
  "unit_amount_decimal": "3000"
}
```

## Identity 

* [Identity verification](https://stripe.com/docs/samples/identity/modal)
* [stripe-samples GH repo](https://github.com/stripe-samples/identity). This sample shows you how to integrate with Stripe Identity. It uses Stripe Elements to collect the user's personal information and Stripe Elements to collect the user's payment information. It also uses Stripe Identity to verify the user's identity.
  
## References

* Repo example of [Ecommerce Store with Netlify Functions, Nuxt, Vue and Stripe](https://github.com/sdras/ecommerce-netlify)
* [Stripe API](https://stripe.com/docs/api)
* Stripe: [Guías de inicio rápido sobre entornos de desarrollo](https://stripe.com/docs/development/quickstart?lang=node)
* [Videos](https://stripe.com/docs/videos/developer-foundations)
* [Stripe Pricing And Fees (2022 Guide)](https://www.forbes.com/advisor/business/services/stripe-pricing-fees/)
* [Introduction to Stripe](https://larryullman.com/2012/10/10/introduction-to-stripe/)

