export class CreateRequestDto {
  text: String;
  fileLinks: String[];
  categoryId: number;
}

//id            Int         @id @default(autoincrement())
//text          String
//status        Statuses    @default(Submitted)
//fileLinks     String[]
//categoryId    Int
//category      Category    @relation(fields: [categoryId], references: [id])
//subcategoryId Int
//subcategory   Subcategory @relation(fields: [subcategoryId], references: [id])
//createdAt     DateTime    @default(now()) @map("created_at")
//updatedAt     DateTime    @updatedAt @map("updated_at")
//Message       Message[]
