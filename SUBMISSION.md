# Submission guide

The project is implemented and tested, but a public repository and live deployment must exist before the assignment is submitted.

Create a **public** repository named **e-plantShopping**. Upload the contents of the project folder, rather than nesting that folder inside the repository. Preserve the `.github/workflows/deploy.yml` file so deployment can run.

After uploading, choose **Settings → Pages → Source → GitHub Actions**, then run **Test and deploy Paradise Nursery** from the Actions tab. Copy the live URL only after deployment succeeds.

## AI-graded fields

Open each file in your GitHub repository and copy the address from the browser:

| Assignment question | File to open |
| --- | --- |
| 1 | README.md |
| 2 | src/AboutUs.jsx |
| 3 | src/App.css |
| 4 | src/App.jsx |
| 5 | src/CartSlice.jsx |
| 6 | src/ProductList.jsx |
| 7 | src/CartItem.jsx |

The URL should be a public GitHub file page containing `/blob/main/`, followed by the file path. Do not submit local paths, ZIP links, or the same repository homepage for every question.

## Before submitting

Open the repository and live application in a signed-out browser. Confirm that:

- The repository is public and its name is exactly `e-plantShopping`.
- Home displays Paradise Nursery, its background artwork, and Get Started.
- Plants shows three categories with six products each.
- Adding a plant changes the navbar count and disables its add button.
- Quantity controls update line totals, total plants, and total price.
- Delete removes the item, and Continue Shopping returns to the catalogue.
- Checkout displays Coming Soon.

The cart is intentionally held in memory and resets on a full page refresh. Navigate between pages using the app links to preserve it.
