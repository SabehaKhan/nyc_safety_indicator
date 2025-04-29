from django.db import models

# Create your models here.
from django.db import models

class ArrestData(models.Model):
    arrest_key = models.BigIntegerField(primary_key=True)
    arrest_date = models.DateField()
    ofns_desc = models.TextField()
    law_cat_cd = models.TextField()
    x_coord_cd = models.IntegerField(null=True, blank=True)
    y_coord_cd = models.IntegerField(null=True, blank=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    boroname = models.TextField(null=True, blank=True)
    nta2020 = models.TextField(null=True, blank=True)
    ntaname = models.TextField(null=True, blank=True)
    cdta2020 = models.TextField(null=True, blank=True)
    cdtaname = models.TextField(null=True, blank=True)
    population = models.IntegerField(null=True, blank=True)

    class Meta:
        db_table = 'arrest_data'  # Match the schema and table name in your database
        managed = False  # Prevent Django from creating a table for this model