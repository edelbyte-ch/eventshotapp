-- Anzeige-Fassung fuer die Lightbox. Nullable: Bestandsfotos bekommen sie
-- erst ueber /api/admin/backfill-display, bis dahin zeigt die Lightbox das Original.
ALTER TABLE "Photo" ADD COLUMN "displayUrl" TEXT;
