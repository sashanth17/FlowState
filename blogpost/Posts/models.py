from django.db import models
from blogpost.settings import AUTH_USER_MODEL
from django.utils.text import slugify
from django.utils import timezone
# Create your models here.


class Categories(models.Model):
    CategoryName=models.CharField(max_length=255)
    CategoryImage=models.ImageField(upload_to='category_img',blank=True,null=True)
    CategoryDescription=models.TextField(max_length=300,null=True,blank=True)
    Author=models.ForeignKey(AUTH_USER_MODEL,on_delete=models.SET_NULL,related_name='Category',null=True)
    def __str__(self):
        return self.CategoryName

class Blog(models.Model):
    Title=models.CharField(max_length=250)
    Slug=models.SlugField(max_length=255,blank=True,null=True)
    Content=models.TextField()
    Author=models.ForeignKey(AUTH_USER_MODEL,on_delete=models.SET_NULL,related_name='blogs',null=True)
    CreatedAt=models.DateTimeField(auto_now_add=True)
    UpdatedAt=models.DateTimeField(auto_now=True)
    PublishedDate=models.DateTimeField(blank=True,null=True)
    IsDraft=models.BooleanField(default=True)
    Category=models.ForeignKey(Categories,on_delete=models.SET_NULL,null=True,related_name="blogs")
    FeatureImage=models.ImageField(upload_to='blogs_img',blank=True,null=True)


    class Meta:
        ordering=["-PublishedDate"]
    def __str__(self):
        return self.Title
    def save(self,*args,**kwargs):
        base_slug=slugify(self.Title)
        slug=base_slug
        num=1
        while Blog.objects.filter(Slug=slug).exists():
            slug=f'{base_slug}-{num}'
            num+=1
        self.Slug=slug
        if not self.IsDraft and self.PublishedDate is None:
            self.PublishedDate=timezone.now()
        super().save(*args,**kwargs)
