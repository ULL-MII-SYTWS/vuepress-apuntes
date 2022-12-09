# Stripe: Plataforma de pago

See <https://stripe.com/docs/development/quickstart?lang=node

```
➜  explorers-up-and-running-with-serverless-functions git:(main) brew install stripe/stripe-cli/stripe
```

```
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

