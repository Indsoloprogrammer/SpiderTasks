import math
import random

t = 3 # threshold
n = 5 # samples
secret = 4124 

# convert points to a single number for better security
def encode(a,b):
	return 0.5*((a+b)**2 + a +3*b)

def decode(x):
	r = math.floor(math.sqrt(2*x + 0.25)-0.5)
	b = x-0.5*(r**2+r)
	a=r-b
	return a,b

# SSS
def f(x):
	y=0
	for i in range(0,t-1):
		y += coeff[i]*(x**(i+1))
	y+=coeff[-1]
	return y

def generate_coeff(t, secret):
	coeff = [random.randrange(1,10**4) for _ in range(0,t-1)]
	coeff.append(secret)
	return coeff

def generate_points(n):
	x = random.sample(range(1,n*10), n)
	return [(x[i], f(x[i])) for i in range(n)]

def generate_shares(points):
	return [int(encode(i[0], i[1])) for i in points]

# Lagrange interpolation
def get_constant_from_shares(shares, n):
	const = 0
	points = [decode(i) for i in shares]
	for i in range(n):
		prod_1, prod_2 = 1,1
		for j in range(n):
			if (j != i):
				prod_1 *= -points[j][0]
				prod_2 *= (points[i][0]-points[j][0])
		const += (prod_1/prod_2)*points[i][1]
	return round(const)

coeff = generate_coeff(t,secret)
points = generate_points(n)
shares = generate_shares(points)
print(f"points: {points}")
print(f"shares: {shares}")
print(f"secret: {get_constant_from_shares(shares, n)}")
